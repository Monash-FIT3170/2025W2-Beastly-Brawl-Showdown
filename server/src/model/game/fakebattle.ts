import { FakePlayer } from "./fakeplayer";


export class FakeBattle {
	private players: Map<string, FakePlayer> = new Map();
	private actions: Map<string, string> = new Map();


	constructor() {}


	public addPlayer(socketId: string, name: string) {
	if (this.players.size < 2) {
		this.players.set(socketId, new FakePlayer(name));
	}
	}


	public removePlayer(socketId: string) {
	this.players.delete(socketId);
	this.actions.delete(socketId);
	}


	public submitAction(socketId: string, action: string): string[] | null {
	if (!this.players.has(socketId)) return null;


	this.actions.set(socketId, action);


	if (this.actions.size === 2) {
		const results = Array.from(this.players.entries()).map(([id, player]) => {
		const act = this.actions.get(id)!;
		return player.getAction(act);
		});


		this.actions.clear();
		return results;
	}


	return null;
	}
}
