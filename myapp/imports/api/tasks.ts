import { Mongo } from "meteor/mongo";

export interface Task {
    _id?: string;
    text: string;
  }

export const TasksCollection = new Mongo.Collection<Task>('tasks');