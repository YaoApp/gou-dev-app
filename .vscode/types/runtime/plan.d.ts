/**
 * The status of a plan or task
 */
export type PlanStatus =
  | "created"
  | "running"
  | "paused"
  | "completed"
  | "failed"
  | "destroyed"
  | "unknown";

/**
 * The event type of a plan or task
 */
export type PlanEventType = "message" | "status" | "data" | "error";

/**
 * The event of a plan or task
 */
export type PlanEvent = { type: PlanEventType; message: string };

/**
 * The function to execute for a task
 */
export type PlanTaskFn = (task: PlanTask, shared: PlanSharedData) => void;

/**
 * The function to execute when the plan changes
 */
export type SubscribeFn = (
  task: PlanTask,
  shared: PlanSharedData,
  event: PlanEvent
) => void;

/**
 * The plan class
 */
export declare class Plan {
  /**
   * @param plan_id - The ID of the plan
   */
  constructor(plan_id: string);

  /**
   * Subscribe to the plan
   * @param subscribe_fn - The function to execute when the plan changes
   */
  Subscribe(subscribe_fn: SubscribeFn): void;

  /**
   * @param task_id - The ID of the task
   * @param task_fn - The function to execute for the task
   */
  Add(task_id: string, order: number, task_fn: PlanTaskFn): void;

  /**
   * Run the plan, synchronously
   */
  Run(): void;

  /**
   * Start the plan, asynchronously
   */
  Start(): void;

  /**
   * Stop the plan, asynchronously
   */
  Stop(): void;

  /**
   * Get the status and each task's status
   */
  Status(): {
    plan: PlanStatus;
    tasks: Record<string, PlanStatus>;
  };

  /**
   * Get the status of a task
   */
  TaskStatus(task_id: string): PlanStatus;

  /**
   * Get or set the data of a task, if no data is provided, the current data is returned, otherwise the data is set and the previous data is returned
   */
  TaskData(task_id: string, data?: any): any;
}

export declare class PlanTask {
  /**
   * Get the plan that the task belongs to
   */
  Plan: Plan;

  constructor(plan: Plan, task_id: string);

  /**
   * Notify the task
   * @param message - The message to notify
   */
  Notify(message: string): void;

  /**
   * Get the status of the task
   */
  Status(): PlanStatus;

  /**
   * Get or set the data of the task, if no data is provided, the current data is returned, otherwise the data is set and the previous data is returned
   */
  Data(data?: any): any;

  /**
   * Retry the task, only available for failed tasks
   */
  Retry(): void;
}

/**
 * The shared data class for a plan
 */
export declare class PlanSharedData {
  /**
   * Set the data of a key
   */
  Set(key: string, value: any): void;

  /**
   * Get the data of a key
   */
  Get(key: string): any;

  /**
   * Delete the data of a key
   */
  Del(key: string): void;
}
