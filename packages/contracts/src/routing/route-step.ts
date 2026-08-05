import type { Coordinate } from "../location/coordinate.js";
import type { Distance } from "../location/distance.js";
import type { Duration } from "../location/duration.js";
import type { Maneuver } from "./maneuver.js";

/**
 * Represents a single navigation step.
 */
export interface RouteStep {
  /**
   * Stable Gyon identifier for this step.
   */
  readonly id: string;

  /**
   * Maneuver to perform.
   */
  readonly maneuver: Maneuver;

  /**
   * Step distance.
   */
  readonly distance: Distance;

  /**
   * Estimated duration.
   */
  readonly duration: Duration;

  /**
   * Coordinate where this step ends.
   */
  readonly end: Coordinate;

  /**
   * Street name for the navigation step.
   */
  readonly street?: string;
}
