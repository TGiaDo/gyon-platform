import type {
  LocationFix,
} from "@gyon/contracts";

import {
  LocationService,
} from "../location/location-service.js";

/**
 * Tracks current device location for navigation.
 */
export class LocationTracker {
  private currentLocation: LocationFix | null = null;

  private unsubscribe: (() => void) | undefined;

  constructor(
    private readonly locationService: LocationService,
  ) {}

  /**
   * Starts tracking location updates.
   */
  start(): void {
    this.unsubscribe =
      this.locationService.onEvent(
        (event, location) => {
          if (
            event === "updated" &&
            location
          ) {
            this.currentLocation = location;
          }
        },
      );
  }

  /**
   * Stops tracking.
   */
  stop(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }

  /**
   * Returns latest known location.
   */
  getCurrentLocation(): LocationFix | null {
    return this.currentLocation;
  }
}
