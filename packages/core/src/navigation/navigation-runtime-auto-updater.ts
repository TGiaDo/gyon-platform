import {
  LocationTracker,
} from "./location-tracker.js";

import {
  NavigationRuntime,
} from "./navigation-runtime.js";


/**
 * Automatically updates navigation runtime
 * when location changes.
 */
export class NavigationRuntimeAutoUpdater {

  private unsubscribe:
    (() => void) | null = null;


  constructor(
    private readonly tracker:
      LocationTracker,

    private readonly runtime:
      NavigationRuntime,
  ) {}



  /**
   * Starts automatic updates.
   */
  start(): void {

    if (this.unsubscribe) {
      return;
    }


    this.unsubscribe =
      this.tracker.onUpdate(
        () => {

          this.runtime.update();

        },
      );
  }



  /**
   * Stops automatic updates.
   */
  stop(): void {

    if (!this.unsubscribe) {
      return;
    }


    this.unsubscribe();

    this.unsubscribe = null;
  }
}
