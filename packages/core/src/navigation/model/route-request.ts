import type {
  Coordinate,
} from "@gyon/contracts";


/**
 * Route calculation request.
 */
export interface RouteRequest {

  /**
   * Route origin.
   */
  origin:
    Coordinate;

  /**
   * Route destination.
   */
  destination:
    Coordinate;

}
