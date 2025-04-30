import { UUID } from "crypto";

export class Player {
    private id: UUID;
    private name: string;
    private monster: Monster;

    constructor(name: string, monster: Monster) {
        this.name = name;
        this.id = crypto.randomUUID();
        this.monster = monster;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}