import {
  DevicePluginRegistry,
} from "../plugin/device-plugin-registry.js";

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
 * Device plugins must be initialized
 * before calling this factory.
 */
export class DeviceRuntimeFactory {


  static create(
    device: DeviceRuntimeType,

    provider:
      LocationProviderType,
  ):
    DeviceRuntime {


    return DevicePluginRegistry.createRuntime(
      device,
      provider,
    );

  }

}
