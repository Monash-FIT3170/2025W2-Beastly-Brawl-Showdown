abstract class Monster {
    private name: string;

    private class: Class;

    private abilities: Ability[];

    private maxHealth: number;

    constructor(name: string, class: Class, ability: Ability, maxHealth: number) {
        this.name = name;
        this.abilities.push(class.getAbility());
        this.abilities.push(ability);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}