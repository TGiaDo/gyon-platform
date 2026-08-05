import type { Distance } from "../location/distance.js";
import type { Duration } from "../location/duration.js";
import type { RouteStep } from "./route-step.js";

/**
 * Represents a route leg.
 */
export interface RouteLeg {
  /**
   * Total leg distance.
   */
  readonly distance: Distance;

  /**
   * Estimated leg duration.
   */
  readonly duration: Duration;

  /**
   * Navigation steps belonging to this leg.
   */
  readonly steps: readonly RouteStep[];
}
