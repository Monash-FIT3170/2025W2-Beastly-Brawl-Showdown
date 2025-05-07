import { Meteor } from "meteor/meteor";
import { startBattle } from "./src/socket/battle";

Meteor.startup(async () => {
	startBattle();
});
