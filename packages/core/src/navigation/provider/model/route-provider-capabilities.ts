/**
 * Route provider capabilities.
 */
export interface RouteProviderCapabilities {

  /**
   * Supports offline route calculation.
   */
  offline:
    boolean;


  /**
   * Supports traffic-aware routing.
   */
  traffic:
    boolean;


  /**
   * Supported transportation modes.
   */
  modes:
    Array<
      | "walking"
      | "cycling"
      | "driving"
    >;

}
