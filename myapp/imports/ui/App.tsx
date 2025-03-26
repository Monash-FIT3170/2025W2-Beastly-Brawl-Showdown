import React from 'react';
import { Hello } from './Hello';
import { Info } from './Info';
import { TaskFormComponent } from './TaskFormComponent';
import { TaskComponent } from './TaskComponent';
import { Task } from '../api/tasks';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { TasksCollection } from '../api/tasks';
import './AppStyles.css';

export const App = () => {
  const isLoading = useSubscribe("tasks");
  const tasks: Task[] = useTracker(() => TasksCollection.find({}).fetch());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1>Welcome to Meteor!</h1>
      <div className="main">
        <TaskFormComponent />
        <ul className="tasks">
          {tasks.map((task) => (
            <TaskComponent key={task._id} task={task} />
          ))}
        </ul>
      </div>
      
      {/* <Hello />
      <Info /> */}
    </div>
  );
}

