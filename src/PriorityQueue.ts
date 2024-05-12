import { Queue } from './Queue';

// @ts-expect-error
export class PriorityQueue<T> implements Queue<T> {}
