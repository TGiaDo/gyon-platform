import type {
  DeviceCapability,
} from "./device-capability.js";



/**
 * Registry of device capabilities.
 */
export class DeviceCapabilityRegistry {


  private static devices =
    new Map<string, DeviceCapability>();



  /**
   * Registers device capability.
   */
  static register(
    capability:
      DeviceCapability,
  ): void {

    this.devices.set(
      capability.device,
      capability,
    );

  }



  /**
   * Returns device capability.
   */
  static get(
    device: string,
  ):
    DeviceCapability | undefined {

    return this.devices.get(
      device,
    );

  }



  /**
   * Checks device support.
   */
  static has(
    device: string,
  ): boolean {

    return this.devices.has(
      device,
    );

  }

}
