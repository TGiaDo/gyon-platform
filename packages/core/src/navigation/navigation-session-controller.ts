import type {
  Route,
} from "@gyon/contracts";

import {
  NavigationSession,
} from "./navigation-session.js";

import {
  NavigationRuntime,
} from "./navigation-runtime.js";

import {
  LocationTracker,
} from "./location-tracker.js";

import {
  NavigationRuntimeAutoUpdater,
} from "./navigation-runtime-auto-updater.js";


/**
 * Controls complete navigation lifecycle.
 */
export class NavigationSessionController {

  private session:
    NavigationSession | undefined;


  constructor(
    private readonly runtime:
      NavigationRuntime,

    private readonly tracker:
      LocationTracker,

    private readonly updater:
      NavigationRuntimeAutoUpdater,
  ) {}



  /**
   * Starts navigation session.
   */
  start(
    route: Route,
  ): void {

    this.runtime.start(
      route,
    );


    this.session =
      this.runtime.getSession();


    this.tracker.start();

    this.updater.start();
  }



  /**
   * Stops navigation.
   */
  stop(): void {

    this.updater.stop();

    this.tracker.stop();

    this.session?.cancel();
  }



  /**
   * Pauses navigation updates.
   */
  pause(): void {

    this.updater.stop();

  }



  /**
   * Resumes navigation updates.
   */
  resume(): void {

    this.tracker.start();

    this.updater.start();

  }



  /**
   * Returns current session.
   */
  getSession():
    NavigationSession | undefined {

    return this.session;
  }
}
