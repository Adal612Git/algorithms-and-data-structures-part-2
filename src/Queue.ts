export interface Queue<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  size(): number;
  isEmpty(): boolean;
}

export interface QueueItem<T> {
  value: T;
  priority: number;
}
