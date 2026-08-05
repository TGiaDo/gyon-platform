/**
 * Query used to discover route providers.
 */
export interface RouteProviderQuery {

  /**
   * Requires offline support.
   */
  offline?:
    boolean;


  /**
   * Requires traffic support.
  */
  traffic?:
    boolean;


  /**
   * Required transportation mode.
   */
  mode?:
    | "walking"
    | "cycling"
    | "driving";

}
