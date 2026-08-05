import type {
  Route,
} from "@gyon/contracts";

import {
  WatchNavigationRuntime,
} from "@gyon/core";


/**
 * Platform level navigation runtime.
 *
 * Provides a device-facing API for:
 * - Huawei Watch
 * - Mobile companion apps
 */
export class DeviceNavigationRuntime {


  constructor(
    private readonly runtime:
      WatchNavigationRuntime,
  ) {}



  /**
   * Starts navigation.
   */
  start(
    route: Route,
  ): void {

    this.runtime.start(
      route,
    );

  }



  /**
   * Stops navigation.
   */
  stop(): void {

    this.runtime.stop();

  }



  /**
   * Pauses navigation.
   */
  pause(): void {

    this.runtime.pause();

  }



  /**
   * Resumes navigation.
   */
  resume(): void {

    this.runtime.resume();

  }



  /**
   * Returns current navigation session.
   */
  getSession() {

    return this.runtime.getSession();

  }
}
