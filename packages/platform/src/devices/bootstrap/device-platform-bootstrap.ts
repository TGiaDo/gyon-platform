import {
  DeviceCapabilityRegistry,
} from "../capabilities/device-capability-registry.js";

import {
  HuaweiWatchCapability,
} from "../huawei/capabilities/huawei-watch-capability.js";

import {
  DevicePluginRegistry,
} from "../plugin/device-plugin-registry.js";

import {
  HuaweiDevicePlugin,
} from "../huawei/huawei-device-plugin.js";


/**
 * Initializes device platform.
 *
 * Registers:
 * - device capabilities
 * - device plugins
 */
export class DevicePlatformBootstrap {


  private static initialized =
    false;



  static initialize(): void {


    if (
      this.initialized
    ) {

      return;

    }



    if (
      !DeviceCapabilityRegistry.get(
        "huawei-watch",
      )
    ) {

      DeviceCapabilityRegistry.register(
        HuaweiWatchCapability,
      );

    }



    if (
      !DevicePluginRegistry.get(
        "huawei-watch",
      )
    ) {

      DevicePluginRegistry.register(
        HuaweiDevicePlugin,
      );

    }



    this.initialized =
      true;

  }

}
