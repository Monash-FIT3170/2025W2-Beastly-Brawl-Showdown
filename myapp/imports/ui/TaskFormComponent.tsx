import React, { useState } from "react";
import { Meteor } from 'meteor/meteor';
import { Task } from '../api/tasks';

export const TaskFormComponent = () => {
  const [text, setText] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!text) return;

    const task: Task = {
      text: text.trim()
    }

    await Meteor.callAsync("tasks.insert", task);

    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input type="text" 
        placeholder="Type to add new tasks" 
        value={text}
        onChange={(e) => setText(e.target.value)}/>

      <button type="submit">Add Task</button>
    </form>
  );
};