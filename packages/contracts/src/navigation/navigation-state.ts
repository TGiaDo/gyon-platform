/**
 * Represents the lifecycle state of a navigation session.
 */
export type NavigationState =
  | "idle"
  | "started"
  | "navigating"
  | "arrived"
  | "cancelled";
