import {
  DevicePluginRegistry,
} from "../plugin/device-plugin-registry.js";

import {
  HuaweiDevicePlugin,
} from "../huawei/huawei-device-plugin.js";

import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";

import type {
  DeviceRuntime,
} from "../plugin/device-plugin.js";



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
  ):
    DeviceRuntime {


    DeviceRuntimeFactory.ensurePlugins();



    return DevicePluginRegistry.createRuntime(
      device,
      provider,
    );

  }



  private static ensurePlugins(): void {


    if (
      !DevicePluginRegistry.get(
        "huawei-watch",
      )
    ) {


      DevicePluginRegistry.register(
        HuaweiDevicePlugin,
      );

    }

  }

}
