import type {
  DisplayAdapter,
  HapticAdapter,
  LocationAdapter,
  LocationFix,
  NavigationInstruction,
} from "@gyon/contracts";


/**
 * Huawei Watch device adapter.
 *
 * Bridge between Gyon runtime and
 * Huawei Watch hardware APIs.
 */
export class HuaweiWatchAdapter
  implements
    DisplayAdapter,
    HapticAdapter,
    LocationAdapter {


  private currentLocation:
    LocationFix | null = null;



  /**
   * Shows navigation instruction.
   */
  showInstruction(
    instruction: NavigationInstruction,
  ): void {

    // TODO:
    // Connect Huawei watch display API

    console.log(
      "WATCH",
      instruction,
    );
  }



  /**
   * Clears navigation screen.
   */
  clear(): void {

    console.log(
      "CLEAR WATCH",
    );
  }



  /**
   * Triggers vibration.
   */
  vibrate(
    durationMs: number,
  ): void {

    console.log(
      "VIBRATE",
      durationMs,
    );
  }



  /**
   * Returns latest location.
   */
  getCurrentLocation():
    LocationFix | null {

    return this.currentLocation;
  }



  /**
   * Updates location from watch GPS.
   */
  update(
    location: LocationFix,
  ): void {

    this.currentLocation =
      location;
  }



  /**
   * Starts hardware provider.
   */
  start(): void {}



  /**
   * Stops hardware provider.
   */
  stop(): void {}
}
