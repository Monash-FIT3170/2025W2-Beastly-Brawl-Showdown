import { Meteor } from "meteor/meteor";
import { Monster, MonstersCollection } from "/types/monster";

//This can be removed it was for testing
Meteor.publish("tasks", function () {
  return MonstersCollection.find();
});

Meteor.startup(async () => {});
