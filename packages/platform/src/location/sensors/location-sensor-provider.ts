import type {
  LocationFix,
} from "@gyon/contracts";


/**
 * Hardware location sensor abstraction.
 *
 * Examples:
 * - Huawei Location Kit
 * - Android Fused Location Provider
 * - iOS Core Location
 */
export interface LocationSensorProvider {


  /**
   * Starts receiving location updates.
   */
  start(
    listener:
      (
        location: LocationFix,
      ) => void,
  ): void;



  /**
   * Stops receiving location updates.
   */
  stop(): void;

}
