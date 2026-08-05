/**
 * Supported device capabilities.
 */
export type DeviceCapabilityType =
  | "location"
  | "navigation"
  | "display"
  | "haptic"
  | "audio"
  | "battery";



/**
 * Describes hardware capabilities
 * exposed by a device.
 */
export interface DeviceCapability {

  /**
   * Device identifier.
   */
  device: string;


  /**
   * Supported capabilities.
   */
  features:
    DeviceCapabilityType[];

}
