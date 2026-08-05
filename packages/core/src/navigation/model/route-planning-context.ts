import type {
  RouteRequest,
} from "./route-request.js";


/**
 * Context used during route planning.
 */
export interface RoutePlanningContext {

  /**
   * Route request.
   */
  request:
    RouteRequest;

}
