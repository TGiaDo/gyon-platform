/**
 * Route calculation options.
 */
export interface RouteOptions {

  /**
   * Travel mode.
   */
  mode?:
    "walking"
    | "cycling"
    | "driving";


  /**
   * Avoid toll roads.
   */
  avoidTolls?:
    boolean;


  /**
   * Avoid highways.
   */
  avoidHighways?:
    boolean;


  /**
   * Use offline routing.
   */
  offline?:
    boolean;

}
