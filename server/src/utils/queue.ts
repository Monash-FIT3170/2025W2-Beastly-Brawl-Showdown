interface IQueue<T> {
  enqueue(item: T): void; // Add item to the end of the queue
  dequeue(): T | undefined; // Remove and return the first item from the queue
  size(): number;
}

export default class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }
  // UPDATE: Potentially rework battle shuffling to avoid adding items to front of Queue
  enqueuefront(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.unshift(item);
  }
  dequeue(): T | undefined {
    return this.storage.shift();
  }
  size(): number {
    return this.storage.length;
  }
  getItems(): T[] {
    return [...this.storage];
  }
  getFrontItem(): T | undefined {
    const returningItem =  this.storage.shift();
    if (returningItem != undefined) {
      this.storage.unshift(returningItem);
    }
    return returningItem;
  }
}
