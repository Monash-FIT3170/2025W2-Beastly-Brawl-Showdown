export class FakePlayer {
	private name: string;
	constructor(name: string) {
	  this.name = name;

	}

	public getAction(action: string){
		if (action === "Attack"){
		  return `${this.name} attacks`
		} else if (action === "Defend"){
		  return `${this.name} defends`
		} else if (action === "Ability 1"){
		  return `${this.name} uses ability 1`
		} else {
		  return `${this.name} uses ability 2`
		}
	  }
}