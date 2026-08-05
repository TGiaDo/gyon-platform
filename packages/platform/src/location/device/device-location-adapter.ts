import type {
  LocationAdapter,
  LocationFix,
} from "@gyon/contracts";

import {
  LocationEventEmitter,
} from "../events/location-event-emitter.js";


/**
 * Base adapter for real device location providers.
 */
export abstract class DeviceLocationAdapter
  implements LocationAdapter {


  protected current:
    LocationFix | null = null;


  protected readonly emitter =
    new LocationEventEmitter();



  getCurrentLocation():
    LocationFix | null {

    return this.current;
  }



  subscribe(
    listener:
      (
        location: LocationFix,
      ) => void,
  ): () => void {

    return this.emitter.subscribe(
      listener,
    );
  }



  protected updateLocation(
    location: LocationFix,
  ): void {

    this.current =
      location;


    this.emitter.emit(
      location,
    );
  }



  abstract start(): void;

  abstract stop(): void;
}
