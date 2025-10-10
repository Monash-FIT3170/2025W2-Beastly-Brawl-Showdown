import React, { useState, useEffect } from "react";
// Update the import path and extension as needed; for example:
import { BattleState } from "../../../../types/composite/battleState";
import socket from "../../socket";
import RoundNumberHeader from "../../components/match-summary/RoundNumberHeader";
import LeftPanel from "../../components/match-summary/LeftPanel";
import RightPanel from "../../components/match-summary/RightPanel";
import MiddlePanel from "../../components/match-summary/MiddlePanel";
import { GameSessionState } from "../../../../types/composite/gameSessionState";
import { PlayerStats } from "../../types/data";
import { IconButton } from "../../components/buttons/IconButton";
import { PopupClean } from "../../components/popups/PopupClean";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { BlackText } from "../../components/texts/BlackText";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GameModeIdentifier } from "../../../../types/single/gameMode";
import ScoringLeaderboard from "../../components/match-summary/ScoringLeaderboard";

interface HostBattlesProps {
  gameCode?: string;
}

const HostBattles: React.FC<HostBattlesProps> = ({ gameCode }) => {
  const code = gameCode; // Currently unused, used for potential page changes
  const [gameMode, setGameMode] = useState<GameModeIdentifier|null>(null);
  const [gameSession, setGameSession] = useState<GameSessionState>();
  const [playerStats, setPlayerStats] = useState<PlayerStats>();
  const [exit, setExit] = useState<Boolean>();
  const [hostWaitNextRound, setWaitNextRound] = useState<boolean>(false);
  const [hostPrepareNextRound, setPrepareNextRound] = useState<boolean>(false);
  const [time, setTime] = useState<number>(5);

  // Function to extract player statistics from battleStates
  const extractPlayerStatistics = (battles: BattleState[] | null) => {
    if (!battles) return { blockData: [], damageData: [] };

    const blockDataMap: Record<string, number> = {};
    const damageDataMap: Record<string, number> = {};

    // Loop through all battles and collect player statistics
    battles.forEach((battle) => {
      const playerState = battle.yourPlayer;
      const playerName = playerState.name;
      const successBlocks = playerState.successBlock || 0; // Use successBlock from player state

      const secondPlayerState = battle.opponentPlayer;
      const secondPlayerName = secondPlayerState.name;
      const secondPlayerSuccessBlocks = secondPlayerState.successBlock || 0; // Use successBlock from player state

      // Current player stats
      blockDataMap[playerName] =
        (blockDataMap[playerName] || 0) + successBlocks;
      damageDataMap[playerName] =
        battle.opponentPlayerMonster.maxHealth - secondPlayerState.currentHealth;

      // Opponent player stats
      blockDataMap[secondPlayerName] =
        (blockDataMap[secondPlayerName] || 0) + secondPlayerSuccessBlocks;
      damageDataMap[secondPlayerName] =
        battle.yourPlayerMonster.maxHealth - playerState.currentHealth;
    });
    // Convert block data to array format and sort by blocks (highest first)
    const blockData = Object.entries(blockDataMap)
      .map(([playerName, blocksAmount]) => ({ playerName, blocksAmount }))
      .sort((a, b) => b.blocksAmount - a.blocksAmount);

    // Convert damage data to array format and sort by damage (highest first)
    const damageData = Object.entries(damageDataMap)
      .map(([playerName, damageAmount]) => ({ playerName, damageAmount }))
      .sort((a, b) => b.damageAmount - a.damageAmount);

    return { blockData, damageData };
  };

    // deletes game session
    const closeGame = () => {
      // UPDATE: popup asking if they are sure before returning to home
      socket.emit("cancel-game", { gameCode: code });
      // return to home
      FlowRouter.go("/");
    };
  
  // Take host to 'Final Results' page for either battle royale or scoring tournament mode
  const showFinalResults = () => {
    if (gameSession.mode === GameModeIdentifier.BATTLE_ROYALE) {
      FlowRouter.go(`/final-results-battle-royale/${code}`);
    } else {
      FlowRouter.go(`/final-results-scoring-tournament/${code}`);
    }
  };

  useEffect(() => {
    {
      /*Listens for the "host_battle_summary" message from the server via Socket.IO.
    When that message arrives, it receives battles (an array or object of match data).
    Then it updates the React state using setBattleStates(battles).
    This lets you:
    Store live data from the server
    Trigger a re-render with the new data if needed */
    }

    // socket.on("most_chosen_monster", (monster: MostChosenMonsterState) => {
    //   console.log('Received most chosen monster:', monster);
    //   setMostChosenMonster(monster);
    // });

    socket.on("game-session-state", ({ session }) => {
      console.log("sessionData:", session);
      setGameSession(session);

      const stats = extractPlayerStatistics(session.battleStates);
      setPlayerStats(stats);
    });

    socket.on("host-wait-next-round", () => {
      setWaitNextRound(true)
    })

    socket.on("host-prepare-next-round", () => {
      console.log("[PREPARENEXROUND]: test"),
      setWaitNextRound(false),
      setPrepareNextRound(true)
    }
    )

    return () => {
      {
        /* This is the cleanup function that React will call when the component unmounts.
          socket.off("host_battle_summary") removes the listener, so you do not get memory leaks or duplicate event handlers. */
      }
      // socket.off("most_chosen_monster");
      socket.off("game-session-state");
      socket.off("host-wait-next-round")
      socket.off("host-prepare-next-round")
    };
  }, []);

    useEffect(() => {
    if (!hostPrepareNextRound){return}

    //Countdown 
    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); //1 second per interval

    //Remove the popup
    const timeout = setTimeout(() =>{
      socket.emit("start-next-battle")
      setPrepareNextRound(false)
      setTime(5)
    }, 5000) // 5 seconds before user get directed to home page
    
    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    }
    
  }, [hostPrepareNextRound])

  useEffect(() => {
    const handleGameMode = (mode: GameModeIdentifier) => {
      console.log("Received game mode:", mode);
      setGameMode(mode);
    };

    socket.on("game-mode", handleGameMode);

    socket.emit("request-game-mode", { gameCode });

    return () => {
      socket.off("game-mode", handleGameMode);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        padding: "1rem",
        margin: "0", // no margin because we'll control spacing by inset
        position: "absolute",
        top: "1rem",
        left: "1rem",
        right: "1rem",
        bottom: "1rem",
        overflow: "auto",
      }}
    >
        {hostPrepareNextRound && (
        <PopupClean>
          <div className="flex flex-col justify-around">
          <BlackText size = 'large'>ALL PLAYERS ARE READY</BlackText>
          <BlackText size = 'large'>NEXT ROUND STARTS IN {time} SECONDS</BlackText>
          </div>
        </PopupClean>)}

        {hostWaitNextRound && (
        <PopupClean>
          <div className="flex flex-col justify-around">
          <BlackText size = 'large'>ROUND {gameSession.metadata.round} HAS ENDED</BlackText>
          <BlackText size = 'large'>WAITING FOR PLAYERS FOR NEXT ROUND...</BlackText>
          </div>
        </PopupClean>)}

        {exit && (
        <PopupClean>
          <div className="flex flex-col justify-around">
          <OutlineText size = 'extraLarge'>QUIT GAME?</OutlineText>
          <BlackText size = 'large'>THIS WILL END ALL END ALL ONGOING BATTLES AND CLOSE THE LOBBY</BlackText>
          <BlackText size = 'large'>DO YOU WANT TO CONTINUE OR END THE GAME</BlackText>
          <div className="flex flex-row justify-between items-center">
            <ButtonGeneric size = 'large' color = 'red' onClick={() => setExit(false)}>BACK</ButtonGeneric>
            <ButtonGeneric size="large" color="blue" onClick={closeGame}>CONFIRM</ButtonGeneric>
          </div>
          </div>
        </PopupClean>)}
      {gameSession && playerStats ? (
        
        <div>
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <IconButton
              style="arrowleft"
              iconColour="black"
              buttonColour="red"
              size="medium"
              onClick={() => setExit(true)}
            />
          </div>
          <RoundNumberHeader roundNumber={gameSession.metadata.round} />
          {/* Main content area with grid layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto", // Left panel, Middle panel, Right panel. auto means take up as much space as you need and 1fr means take up the rest of the remaining space
              gap: "1rem",
              marginTop: "1rem",
              height: "calc(100% - 8rem)", // Adjust based on header height
              // border: '2px solid #403245',
              position: "relative",
            }}
          >
            {/* Left Panel */}
            {/* <div className="left-panel"> */}
            <LeftPanel
              damageData={playerStats.damageData.slice(0, 3)} // Top 3 damage dealt
              blockData={playerStats.blockData.slice(0, 3)} // Top 3 blocks
              popularMonster={gameSession.gameSessionData.mostChosenMonster}
            />
            {/* </div> */}

            {/* Middle Panel */}
            <div style={{ height: "100%", overflow: "auto" }}>
              <MiddlePanel gameSession={gameSession} gameMode={gameMode}/>
            </div>

            {/* Right Panel */}
            <div
              style={{ minWidth: "260px", height: "100%", overflow: "auto" }}
            >
              {gameSession.mode == GameModeIdentifier.SCORING ? 
                <ScoringLeaderboard metadata={gameSession.metadata}/> :
                <RightPanel battleStates={gameSession.battleStates} /> 
              }
            </div>
          </div>
          <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
            <ButtonGeneric
              size="medium"
              color="blue"
              isDisabled={!gameSession.isGameModeFinished}
              onClick={showFinalResults}
            >
              <OutlineText size="medium">
                SHOW FINAL RESULTS
              </OutlineText>
            </ButtonGeneric>
          </div>
        </div>
      ) : null}
    </div>
  );
};


export default HostBattles;
