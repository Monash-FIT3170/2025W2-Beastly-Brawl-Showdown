import { Server, Socket } from "socket.io";
import { Battle } from "../../model/game/battle";
import { NullAction } from "../../model/game/action/null";
import { players, battles } from "../../../main";
import { AttackAction } from "../../model/game/action/attack";

export const startBattleHandler = (io: Server, socket: Socket) => {
  socket.on("start_battle", () => {
    if (players.size % 2 == 0) { // We need an even number of players so that everyone can battle
      let playersList = Array.from(players.values());

      const monsterCount: Record<string, number> = {}; //to account for the monsters picked by players
      //find most picked monster (for statictis to be displayed on host)
      playersList.forEach((player) =>{
        const monsterName = player.getMonster().getName()
        
        if (monsterCount[monsterName]){
          monsterCount[monsterName]++;
        } else {
          monsterCount[monsterName] = 1;
        }
      })

      let mostPicked: string | null = null; //return the most picked monster (return the first highest count monster)
      let maxCount = 0;

      for (const [monsterName,count] of Object.entries(monsterCount)){
        if (count > maxCount){
          mostPicked = monsterName;
          maxCount = count;
        }
      }

      const result = {
        monster: mostPicked,
        percentagePick: Math.round((maxCount / playersList.length) *100).toString() // to nearest integer (string type)
      }
      
      //TODO: replace 'host_room' with the host socket id
      io.to("host_room").emit("most_chosen_monster",result);

      // Loop over pairs of players
      for (let i = 0; i < playersList.length; i += 2) {
        let player1 = playersList[i];
        let player2 = playersList[i + 1];

        // Create a new battle instance
        let battleId = crypto.randomUUID();
        let battle = new Battle(battleId, player1, player2);
        battles.set(battleId, battle);

        // Gets a pair of players to join a room
        io.sockets.sockets.get(player1.getId())?.join(battleId);
        io.sockets.sockets.get(player2.getId())?.join(battleId);
        console.log(`Player ${player1.getName()} and Player ${player2.getName()} joined battle ${battleId}`);

        // Emit the battle_started to the pair of players + start battle turns
        io.to(battleId).emit("battle_started", battleId);
        proceedBattleTurn(io, battle);
      }
    }
  });
};

// TODO: separate this function into a separate file
function proceedBattleTurn(io: Server, battle: Battle) {
  // TODO: Set a property in the battle instance to object it is in the 10 sec waiting stage (for the host match summary page)
  battle.clearBattleLogs();
  battle.incTurn();

  let playersInBattle = battle.getPlayers();

  playersInBattle.forEach((player) => {
    io.to(player.getId()).emit(
      "battle_state",
      battle.getBattleState(player.getId())
    ); // Emit the battle state to each player

    let actions = player.getMonster().getPossibleActionStates();
    io.to(player.getId()).emit("possible_actions", actions); // Emit the list of action names
  });

  let player1 = playersInBattle[0];
  let player2 = playersInBattle[1];

  let timer = 5; // Game timer for a turn 
  const interval = setInterval(() => {
    if (timer >= 0) {
      io.to(battle.getId()).emit("timer", timer);
      timer--;
    } else {
      // Turn is over, conduct the "battle" logic
      clearInterval(interval);

      // Check each player in battle has a selected action
      playersInBattle.forEach((player) => {
        if (player.getActions().length === 0) {
          player.addAction(new NullAction());
        }
      });

      // Prepare method
      player1.getActions().forEach((action) => {
        action.prepare(player1, player2);
      });

      player2.getActions().forEach((action) => {
        action.prepare(player2, player1);
      });

      // Execute method
      player1.getActions().forEach((action) => {
        action.execute(player1, player2);

        // Handles the dice roll - For now, typecasting to send the damage so dice can roll it
        if (action.getName() === "Attack") {
          const attackAction = action as AttackAction;
          const damage = attackAction.getDamage();
          io.to(player1.getId()).emit("roll_dice", damage);
        }

      });

      player2.getActions().forEach((action) => {
        action.execute(player2, player1);
  
        if (action.getName() === "Attack") {
          const attackAction = action as AttackAction;
          const damage = attackAction.getDamage();
          io.to(player2.getId()).emit("roll_dice", damage);
        }

      });

      console.log("P1: ", player1);

      console.log("P2: ", player2);

      // Emite the result of the battle state after the turn is complete
      playersInBattle.forEach((player) => {
        io.to(player.getId()).emit(
          "battle_state",
          battle.getBattleState(player.getId())
        );
      });

      // After results of actions are sent to the client, and client has updated its UI, need to reset the stats of player back to Monster
      playersInBattle.forEach((player) => {
        player.resetStats();
        player.resetActions();
      });

      // When battle over, emit battle_end and pass winner to the 2 client's UI
      if (battle.isBattleOver()) {
        io.to(battle.getId()).emit("battle_end", battle.getWinner());
      }

      const allBattleStates = getAllBattleStatesForHost();
      console.log(JSON.stringify(allBattleStates,null, 2))
      //TODO: replace 'host_room' with the host socket ID
      io.to("host_room").emit("host_battle_summary", allBattleStates) //emit every turn 

      // TODO: Set a 2-5 second "animation" window, and set a property in the battle instance to object it is in the animation stage (for the host match summary page)

      setTimeout(() => {
        // TODO: Set a property in the battle instance to object it is in the battle result stage (for the host match summary page)
        proceedBattleTurn(io, battle);
      }, 2000);
    }
  }, 1000); // Emit every second
}

function getAllBattleStatesForHost(): any[] {
  const result: any[] = [];
  battles.forEach((battle) => {
    const players = battle.getPlayers();
    const battleId = battle.getId();

    const playerStates = players.map((player) => ({
      //each player state returns player's id, name, current attack/amour stats, logs (the action/s performed during last turn)
      playerState: player.getPlayerState() 
    }))

    result.push({
      battleId,
      turn: battle.getTurn(),
      players: playerStates,
      isOver: battle.isBattleOver()
    })
  })
  return result;
}
