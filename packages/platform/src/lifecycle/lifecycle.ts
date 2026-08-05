/**
 * Common lifecycle contract.
 *
 * Implemented by platform services
 * that can be started and stopped.
 */
export interface Lifecycle {

  /**
   * Starts service.
   */
  start(): void;



  /**
   * Stops service.
   */
  stop(): void;

}
