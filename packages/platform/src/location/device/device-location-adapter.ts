import type {
  LocationAdapter,
  LocationFix,
} from "@gyon/contracts";

/**
 * Base adapter for real device location providers.
 *
 * This class will be extended by:
 * - iOS location provider
 * - Android location provider
 * - Huawei Watch provider
 */
export abstract class DeviceLocationAdapter
  implements LocationAdapter {

  protected current: LocationFix | null = null;


  /**
   * Returns latest device location.
   */
  getCurrentLocation():
    LocationFix | null {

    return this.current;
  }


  /**
   * Starts device location updates.
   */
  abstract start(): void;


  /**
   * Stops device location updates.
   */
  abstract stop(): void;


  /**
   * Updates location from native layer.
   */
  protected updateLocation(
    location: LocationFix,
  ): void {

    this.current = location;
  }
}
