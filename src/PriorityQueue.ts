import { Queue, type QueueItem } from './Queue';

export class PriorityQueue<T> implements Queue<T> {
  private heap: QueueItem<T>[] = [];

  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.siftUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    this.swap(0, this.heap.length - 1);
    const removed = this.heap.pop();

    if (!this.isEmpty()) {
      this.siftDown(0);
    }

    return removed?.value;
  }

  peek(): T | undefined {
    return this.heap[0]?.value;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private siftUp(index: number): void {
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.compare(currentIndex, parentIndex) === -1) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  private siftDown(index: number): void {
    let currentIndex = index;
    const lastIndex = this.heap.length - 1;

    while (true) {
      const leftIndex = currentIndex * 2 + 1;
      const rightIndex = currentIndex * 2 + 2;
      let smallestIndex = currentIndex;

      if (leftIndex <= lastIndex && this.compare(leftIndex, smallestIndex) === -1) {
        smallestIndex = leftIndex;
      }

      if (rightIndex <= lastIndex && this.compare(rightIndex, smallestIndex) === -1) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== currentIndex) {
        this.swap(currentIndex, smallestIndex);
        currentIndex = smallestIndex;
      } else {
        break;
      }
    }
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  private compare(index1: number, index2: number): 0 | 1 | -1 {
    const priority1 = this.heap[index1].priority;
    const priority2 = this.heap[index2].priority;

    if (priority1 === priority2) {
      return 0;
    }

    return priority1 < priority2 ? -1 : 1;
  }
}
