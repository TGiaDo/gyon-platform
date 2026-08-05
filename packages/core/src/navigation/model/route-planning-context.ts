import type {
  RouteRequest,
} from "./route-request.js";

import type {
  RouteOptions,
} from "./route-options.js";


/**
 * Context used during route planning.
 */
export interface RoutePlanningContext {

  /**
   * Route request.
   */
  request:
    RouteRequest;


  /**
   * Route calculation options.
   */
  options?:
    RouteOptions;

}
