import { UUID } from "crypto";
import { Player } from "./player"; // Adjust the path based on the actual location of the Player definition

class Battle {
    private id: UUID;
    private player1: Player;
    private player2: Player;
    private turnCount: number = 0;
    private winner: Player | null = null;

    constructor(player1: Player, player2: Player) {
        this.player1 = player1;
        this.player2 = player2;
        this.id = crypto.randomUUID();
    }
}
