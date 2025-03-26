import { Meteor } from "meteor/meteor";
import { Task } from "./tasks";
import { insertTask } from "../../server/main"

Meteor.methods({
  "tasks.insert"(task: Task) {
    const foo = "string";
    return insertTask(foo)
  },
});