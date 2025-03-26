import React from "react";
import { Task } from "../api/tasks";

interface TaskComponentProps {
  task: Task
}

export const TaskComponent = ( props: TaskComponentProps ) => {
  console.log(props.task); // Log the task object to verify its structure

  return <li>{props.task.text}</li>;
};