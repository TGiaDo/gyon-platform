import {
  HuaweiDeviceRuntime,
} from "../huawei/runtime/huawei-device-runtime.js";

import {
  DeviceCapabilityRegistry,
} from "../capabilities/device-capability-registry.js";

import {
  HuaweiWatchCapability,
} from "../huawei/capabilities/huawei-watch-capability.js";

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


    DeviceRuntimeFactory.ensureRegistered();



    const capability =
      DeviceCapabilityRegistry.get(
        device,
      );


    if (!capability) {

      throw new Error(
        `Unsupported device runtime: ${device}`,
      );

    }



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



  private static ensureRegistered(): void {

    if (
      !DeviceCapabilityRegistry.has(
        "huawei-watch",
      )
    ) {

      DeviceCapabilityRegistry.register(
        HuaweiWatchCapability,
      );

    }

  }

}
