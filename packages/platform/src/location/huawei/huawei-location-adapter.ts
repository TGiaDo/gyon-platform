import type {
  LocationFix,
} from "@gyon/contracts";

import {
  DeviceLocationAdapter,
} from "../device/device-location-adapter.js";

import {
  HuaweiLocationSensorProvider,
} from "./huawei-location-sensor-provider.js";


/**
 * Huawei device location adapter.
 *
 * Connects Huawei location sensors
 * with the common platform location pipeline.
 */
export class HuaweiLocationAdapter
  extends DeviceLocationAdapter {


  constructor(
    private readonly sensor:
      HuaweiLocationSensorProvider,
  ) {
    super();
  }


  /**
   * Starts Huawei location updates.
   */
  start(): void {

    this.sensor.start(
      (
        location: LocationFix,
      ) => {

        this.updateLocation(
          location,
        );

      },
    );

  }


  /**
   * Stops Huawei location updates.
   */
  stop(): void {

    this.sensor.stop();

  }
}
