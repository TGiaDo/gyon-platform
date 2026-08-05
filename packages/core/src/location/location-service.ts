import type {
  LocationEvent,
  LocationFix,
  LocationProvider,
} from "@gyon/contracts";

/**
 * Manages location updates from a provider.
 */
export class LocationService {
  private currentLocation: LocationFix | null = null;

  private listeners = new Set<
    (event: LocationEvent, location?: LocationFix) => void
  >();

  constructor(
    private readonly provider: LocationProvider,
  ) {}

  /**
   * Emits location event.
   */
  private emit(
    event: LocationEvent,
    location?: LocationFix,
  ): void {
    for (const listener of this.listeners) {
      listener(event, location);
    }
  }

  /**
   * Subscribes to location events.
   */
  onEvent(
    listener: (
      event: LocationEvent,
      location?: LocationFix,
    ) => void,
  ): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Starts location tracking.
   */
  start(): void {
    this.provider.start();
    this.emit("started");
  }

  /**
   * Stops location tracking.
   */
  stop(): void {
    this.provider.stop();
    this.emit("stopped");
  }

  /**
   * Gets current known location.
   */
  getCurrentLocation(): LocationFix | null {
    return this.currentLocation;
  }

  /**
   * Updates current location.
   */
  update(location: LocationFix): void {
    this.currentLocation = location;
    this.emit("updated", location);
  }
}
