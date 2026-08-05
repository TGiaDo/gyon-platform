import type { Distance } from "../location/distance.js";
import type { Duration } from "../location/duration.js";
import type { RouteLeg } from "./route-leg.js";

/**
 * Represents a navigation route.
 */
export interface Route {
  /**
   * Total route distance.
   */
  readonly distance: Distance;

  /**
   * Estimated route duration.
   */
  readonly duration: Duration;

  /**
   * Route legs.
   */
  readonly legs: readonly RouteLeg[];
}
