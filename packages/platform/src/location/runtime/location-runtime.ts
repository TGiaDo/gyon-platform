import type {
  LocationAdapter,
  LocationFix,
} from "@gyon/contracts";

import type {
  Lifecycle,
} from "../../lifecycle/index.js";


/**
 * Runtime controller for location subsystem.
 *
 * Owns location lifecycle and provides
 * unified access to current location.
 */
export class LocationRuntime implements Lifecycle {


  constructor(
    private readonly adapter:
      LocationAdapter,
  ) {}



  /**
   * Starts location subsystem.
   */
  start(): void {

    this.adapter.start();

  }



  /**
   * Stops location subsystem.
   */
  stop(): void {

    this.adapter.stop();

  }



  /**
   * Returns latest known location.
   */
  getCurrentLocation():
    LocationFix | null {

    return this.adapter.getCurrentLocation();

  }

}
