import { Scheduler } from './Scheduler';
import { PriorityQueue } from './PriorityQueue';

export class TasksScheduler implements Scheduler {
  private pq: PriorityQueue<() => Promise<any>> = new PriorityQueue();

  postTask(task: () => Promise<any>, priority: number): void {
    this.pq.enqueue(task, priority);
  }

  async run(): Promise<void> {
    const tasks: Promise<any>[] = [];

    while (!this.pq.isEmpty()) {
      const task = this.pq.dequeue();

      if (task) {
        const wrappedTask = Promise.resolve().then(() => task());
        tasks.push(wrappedTask);
      }
    }

    await Promise.allSettled(tasks);
  }
}
