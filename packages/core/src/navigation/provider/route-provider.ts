import type {
  Route,
  Coordinate,
} from "@gyon/contracts";


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
    origin: Coordinate,
    destination: Coordinate,
  ): Promise<Route>;

}
