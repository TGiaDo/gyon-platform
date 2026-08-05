import type {
  LocationFix,
} from "@gyon/contracts";


export type LocationListener =
  (
    location: LocationFix,
  ) => void;


/**
 * Emits location updates
 * from device providers.
 */
export class LocationEventEmitter {

  private listeners =
    new Set<LocationListener>();


  /**
   * Subscribe to location updates.
   */
  subscribe(
    listener: LocationListener,
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
   * Emit new location.
   */
  emit(
    location: LocationFix,
  ): void {

    for (
      const listener of this.listeners
    ) {
      listener(location);
    }
  }


  /**
   * Removes all listeners.
   */
  clear(): void {

    this.listeners.clear();

  }
}
