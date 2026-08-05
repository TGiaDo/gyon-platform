import type {
  LocationFix,
} from "@gyon/contracts";

import type {
  LocationSensorProvider,
} from "../sensors/location-sensor-provider.js";


/**
 * Huawei location sensor provider.
 *
 * Abstracts Huawei Location Kit integration.
 *
 * This implementation currently provides
 * the platform boundary only.
 */
export class HuaweiLocationSensorProvider
  implements LocationSensorProvider {


  private listener:
    ((location: LocationFix) => void)
    | undefined;


  /**
   * Starts Huawei location updates.
   */
  start(
    listener:
      (
        location: LocationFix,
      ) => void,
  ): void {

    this.listener = listener;

  }



  /**
   * Stops Huawei location updates.
   */
  stop(): void {

    this.listener = undefined;

  }



  /**
   * Receives a location update
   * from Huawei Location Kit.
   *
   * Internal bridge method.
   */
  protected emitLocation(
    location: LocationFix,
  ): void {

    this.listener?.(
      location,
    );

  }
}
