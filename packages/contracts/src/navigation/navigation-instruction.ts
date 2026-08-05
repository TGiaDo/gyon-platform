import type { Distance } from "../location/distance.js";
import type { Maneuver } from "../routing/maneuver.js";

/**
 * Represents a navigation instruction for the current step.
 */
export interface NavigationInstruction {
  /**
   * Route step identifier.
   */
  readonly stepId: string;

  /**
   * Maneuver to perform.
   */
  readonly maneuver: Maneuver;

  /**
   * Distance remaining before performing the maneuver.
   */
  readonly distance: Distance;
}
