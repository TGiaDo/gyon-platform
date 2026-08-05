import type {
  DevicePlugin,
  DeviceRuntime,
} from "./device-plugin.js";


import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";



/**
 * Registry of device plugins.
 */
export class DevicePluginRegistry {


  private static plugins =
    new Map<string, DevicePlugin>();



  /**
   * Registers plugin.
   */
  static register(
    plugin:
      DevicePlugin,
  ): void {

    this.plugins.set(
      plugin.id,
      plugin,
    );

  }



  /**
   * Returns plugin.
   */
  static get(
    id: string,
  ):
    DevicePlugin | undefined {

    return this.plugins.get(
      id,
    );

  }



  /**
   * Creates runtime from plugin.
   */
  static createRuntime(
    id: string,

    provider:
      LocationProviderType,
  ):
    DeviceRuntime {


    const plugin =
      this.get(id);



    if (!plugin) {

      throw new Error(
        `Unknown device plugin: ${id}`,
      );

    }



    return plugin.createRuntime(
      provider,
    );

  }

}
