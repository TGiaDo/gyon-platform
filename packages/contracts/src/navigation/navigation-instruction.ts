import type { Distance } from "../location/distance.js";
import type { Maneuver } from "../routing/maneuver.js";

/**
 * Represents a user-facing navigation instruction.
 */
export interface NavigationInstruction {
  /**
   * Maneuver action.
   */
  readonly maneuver: Maneuver;

  /**
   * Distance before action.
   */
  readonly distance: Distance;

  /**
   * Human readable instruction text.
   */
  readonly text: string;
}
