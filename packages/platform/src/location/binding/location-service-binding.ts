import type {
  LocationFix,
} from "@gyon/contracts";

import type {
  DeviceLocationAdapter,
} from "../device/device-location-adapter.js";


export interface LocationUpdateConsumer {

  update(
    location: LocationFix,
  ): void;

}


/**
 * Connects location provider
 * with a location consumer.
 */
export class LocationServiceBinding {

  private unsubscribe:
    (() => void) | null = null;


  constructor(
    private readonly adapter:
      DeviceLocationAdapter,

    private readonly consumer:
      LocationUpdateConsumer,
  ) {}



  start(): void {

    if (this.unsubscribe) {
      return;
    }


    this.unsubscribe =
      this.adapter.subscribe(
        (
          location,
        ) => {

          this.consumer.update(
            location,
          );

        },
      );
  }



  stop(): void {

    if (!this.unsubscribe) {
      return;
    }


    this.unsubscribe();

    this.unsubscribe = null;
  }
}
