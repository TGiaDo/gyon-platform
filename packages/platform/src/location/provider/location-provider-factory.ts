import type {
  LocationAdapter,
} from "@gyon/contracts";

import {
  SimulatorLocationAdapter,
} from "../simulator-location-adapter.js";

import {
  HuaweiLocationAdapter,
} from "../huawei/huawei-location-adapter.js";

import {
  HuaweiLocationSensorProvider,
} from "../huawei/huawei-location-sensor-provider.js";


export type LocationProviderType =
  | "simulator"
  | "huawei";


/**
 * Creates platform location providers.
 *
 * Centralizes provider selection so
 * applications do not depend on
 * concrete adapters.
 */
export class LocationProviderFactory {


  static create(
    type: LocationProviderType,
  ): LocationAdapter {


    switch (type) {


      case "simulator":

        return new SimulatorLocationAdapter();


      case "huawei":

        return new HuaweiLocationAdapter(
          new HuaweiLocationSensorProvider(),
        );


      default:

        throw new Error(
          `Unsupported location provider: ${type}`,
        );
    }
  }
}
