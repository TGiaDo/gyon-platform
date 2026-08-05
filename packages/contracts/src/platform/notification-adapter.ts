/**
 * Provides notification output (local notifications) from the companion device.
 */
export interface NotificationAdapter {

  /**
   * Sends a local notification payload immediately.
   */
  notify(payload: {
    id: string;
    title: string;
    subtitle?: string;
    body?: string;
    data?: Record<string, unknown>;
  }): void;

  /**
   * Schedules or repeats a notification. Implementations may ignore repeat.
   */
  schedule?(payload: {
    id: string;
    title: string;
    subtitle?: string;
    body?: string;
    intervalMs?: number;
    data?: Record<string, unknown>;
  }): void;

}
