import type { LocationFix } from "./location-fix.js";

/**
 * Provides location updates from a location source.
 *
 * Examples:
 * - iPhone GPS
 * - Huawei Watch GPS
 * - Android location service
 */
export interface LocationProvider {
  /**
   * Returns current location.
   */
  getCurrentLocation(): Promise<LocationFix>;

  /**
   * Starts receiving location updates.
   */
  start(): void;

  /**
   * Stops receiving location updates.
   */
  stop(): void;
}
