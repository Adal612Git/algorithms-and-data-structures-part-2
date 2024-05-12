export interface Scheduler {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}
