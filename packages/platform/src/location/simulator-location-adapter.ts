import type {
  LocationAdapter,
  LocationFix,
} from "@gyon/contracts";


/**
 * Development location provider.
 *
 * Simulates GPS updates.
 */
export class SimulatorLocationAdapter
  implements LocationAdapter {

  private current:
    LocationFix | null = null;


  constructor(
    initial?: LocationFix,
  ) {

    this.current =
      initial ?? null;
  }


  /**
   * Returns current simulated location.
   */
  getCurrentLocation():
    LocationFix | null {

    return this.current;
  }


  /**
   * Starts location source.
   */
  start(): void {
    // simulator does not need startup logic
  }


  /**
   * Stops location source.
   */
  stop(): void {
    // simulator does not need cleanup
  }


  /**
   * Updates simulated GPS position.
   */
  update(
    location: LocationFix,
  ): void {

    this.current =
      location;
  }
}
