/**
 * Runtime provider health state.
 */
export interface ProviderHealthState {

  /**
   * Current health status.
   */
  status:
    "healthy"
    | "degraded"
    | "offline";


  /**
   * Average response latency.
   */
  latency:
    number;


  /**
   * Consecutive failures.
   */
  failures:
    number;


  /**
   * Last successful response timestamp.
   */
  lastSuccessAt:
    number | undefined;

}
