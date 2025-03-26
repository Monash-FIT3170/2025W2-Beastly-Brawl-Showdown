import { Meteor } from 'meteor/meteor';
import { Link, LinksCollection } from '/imports/api/links';
import { Task, TasksCollection } from '/imports/api/tasks';
import "/imports/api/tasksMethods"; 

async function insertLink({ title, url }: Pick<Link, 'title' | 'url'>) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

export async function insertTask({ text }: Pick<Task, 'text'>) {
  await TasksCollection.insertAsync({ text });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // If the Tasks collection is empty, add some data.
  if (await TasksCollection.find().countAsync() === 0) {
    await insertTask({
      text: 'Sample Task 1!',
    });

    await insertTask({
      text: 'Sample Task 2!',
    });
  }

  // We publish the entire Tasks collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("tasks", function () {
    return TasksCollection.find();
  });
});
