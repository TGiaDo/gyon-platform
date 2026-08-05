import type {
  DeviceCapability,
} from "../../capabilities/device-capability.js";


/**
 * Huawei Watch supported capabilities.
 */
export const HuaweiWatchCapability:
  DeviceCapability = {

  device:
    "huawei-watch",

  features: [

    "location",

    "navigation",

    "display",

    "haptic",

  ],

};
