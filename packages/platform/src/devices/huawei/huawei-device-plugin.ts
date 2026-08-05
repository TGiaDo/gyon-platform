import type {
  DevicePlugin,
  DeviceRuntime,
} from "../plugin/device-plugin.js";

import {
  HuaweiDeviceRuntime,
} from "./runtime/huawei-device-runtime.js";

import {
  HuaweiWatchCapability,
} from "./capabilities/huawei-watch-capability.js";

import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";



/**
 * Huawei Watch device plugin.
 */
export const HuaweiDevicePlugin:
  DevicePlugin = {


  id:
    "huawei-watch",



  capability:
    HuaweiWatchCapability,



  createRuntime(
    provider:
      LocationProviderType,
  ):
    DeviceRuntime {

    return new HuaweiDeviceRuntime(
      provider,
    );

  },

};
