import {
  NavigationRuntimeFactory,
} from "../../navigation/runtime/navigation-runtime-factory.js";

import {
  DeviceNavigationRuntime,
} from "../../navigation/device-navigation-runtime.js";

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
  ): DeviceNavigationRuntime {


    switch (device) {


      case "huawei-watch": {

        const navigationRuntime =
          NavigationRuntimeFactory.create(
            provider,
          );


        return new DeviceNavigationRuntime(
          navigationRuntime as any,
        );

      }


      default:

        throw new Error(
          `Unsupported device runtime: ${device}`,
        );
    }

  }

}
