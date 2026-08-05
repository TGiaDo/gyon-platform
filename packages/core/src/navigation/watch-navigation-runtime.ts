import type {
  Route,
} from "@gyon/contracts";

import {
  NavigationSessionController,
} from "./navigation-session-controller.js";

import {
  NavigationSession,
} from "./navigation-session.js";


/**
 * Device-level navigation facade.
 *
 * Designed for:
 * - Smart watches
 * - Mobile devices
 * - Embedded navigation clients
 */
export class WatchNavigationRuntime {


  constructor(
    private readonly controller:
      NavigationSessionController,
  ) {}



  /**
   * Starts navigation.
   */
  start(
    route: Route,
  ): void {

    this.controller.start(
      route,
    );
  }



  /**
   * Stops navigation.
   */
  stop(): void {

    this.controller.stop();

  }



  /**
   * Pauses navigation.
   */
  pause(): void {

    this.controller.pause();

  }



  /**
   * Resumes navigation.
   */
  resume(): void {

    this.controller.resume();

  }



  /**
   * Returns current session.
   */
  getSession():
    NavigationSession | undefined {

    return this.controller.getSession();

  }
}
