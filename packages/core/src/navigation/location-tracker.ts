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

  private listeners =
    new Set<
      (location: LocationFix) => void
    >();

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

            for (const listener of this.listeners) {
              listener(location);
            }
          }
        },
      );
  }


  /**
   * Subscribes to location updates.
   */
  onUpdate(
    listener: (
      location: LocationFix,
    ) => void,
  ): () => void {

    this.listeners.add(
      listener,
    );

    return () => {
      this.listeners.delete(
        listener,
      );
    };
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
