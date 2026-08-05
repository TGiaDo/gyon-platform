import type {
  LocationFix,
} from "../location/location-fix.js";


/**
 * Provides device location source.
 *
 * Examples:
 * - iPhone GPS
 * - Huawei Watch GPS
 */
export interface LocationAdapter {

  /**
   * Returns current location.
   */
  getCurrentLocation():
    LocationFix | null;


  /**
   * Starts location updates.
   */
  start(): void;


  /**
   * Stops location updates.
   */
  stop(): void;
}
