import { Meteor } from "meteor/meteor";
import { Task } from "./tasks";
import { insertTask } from "../../server/main"

Meteor.methods({
  "tasks.insert"(task: Task) {
    return insertTask(task)
  },
});