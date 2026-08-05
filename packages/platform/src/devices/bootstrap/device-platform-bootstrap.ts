import {
  DevicePluginRegistry,
} from "../plugin/device-plugin-registry.js";

import {
  HuaweiDevicePlugin,
} from "../huawei/huawei-device-plugin.js";


/**
 * Initializes device platform plugins.
 *
 * This is the single entry point
 * for registering supported devices.
 */
export class DevicePlatformBootstrap {


  private static initialized =
    false;



  /**
   * Registers all device plugins.
   */
  static initialize(): void {


    if (this.initialized) {
      return;
    }



    DevicePluginRegistry.register(
      HuaweiDevicePlugin,
    );



    this.initialized =
      true;

  }

}
