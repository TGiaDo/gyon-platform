import {
  HuaweiDeviceRuntime,
} from "../huawei/runtime/huawei-device-runtime.js";

import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";


/**
 * Supported device runtime types.
 */
export type DeviceRuntimeType =
  | "huawei-watch";


/**
 * Creates complete device runtime.
 *
 * Entry point for hardware platforms.
 */
export class DeviceRuntimeFactory {


  static create(
    device: DeviceRuntimeType,

    provider:
      LocationProviderType,
  ): HuaweiDeviceRuntime {


    switch (device) {


      case "huawei-watch":

        return new HuaweiDeviceRuntime(
          provider,
        );


      default:

        throw new Error(
          `Unsupported device runtime: ${device}`,
        );
    }

  }

}
