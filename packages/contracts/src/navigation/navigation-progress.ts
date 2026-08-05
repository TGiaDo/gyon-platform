import type { Distance } from "../location/distance.js";
import type { Duration } from "../location/duration.js";

/**
 * Represents the current progress of a navigation session.
 */
export interface NavigationProgress {
  /**
   * Current route step identifier.
   */
  readonly stepId: string;

  /**
   * Remaining distance to complete the current step.
   */
  readonly distanceRemaining: Distance;

  /**
   * Remaining estimated time for the current step.
   */
  readonly durationRemaining: Duration;
}
