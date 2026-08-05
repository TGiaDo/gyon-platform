/**
 * Route provider health status.
 */
export type RouteProviderHealthStatus =
  | "healthy"
  | "degraded"
  | "offline";


/**
 * Runtime health information.
 */
export interface RouteProviderHealth {

  /**
   * Current provider status.
   */
  status:
    RouteProviderHealthStatus;


  /**
   * Average response latency.
   */
  latency:
    number;

}
