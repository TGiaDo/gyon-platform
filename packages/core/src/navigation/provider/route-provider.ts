import type {
  Route,
} from "@gyon/contracts";

import type {
  RouteRequest,
} from "../model/index.js";


/**
 * Route calculation provider.
 *
 * Implementations may use:
 * - Gyon Maps
 * - OSRM
 * - GraphHopper
 * - HERE
 * - Google
 */
export interface RouteProvider {

  /**
   * Calculates a route.
   */
  calculate(
    request: RouteRequest,
  ): Promise<Route>;

}
