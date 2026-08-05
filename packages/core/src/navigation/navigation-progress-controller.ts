import type {
  LocationFix,
} from "@gyon/contracts";

import {
  NavigationSession,
} from "./navigation-session.js";

import {
  LocationTracker,
} from "./location-tracker.js";

import {
  PositionMatcher,
} from "./position-matcher.js";

/**
 * Updates navigation progress from location updates.
 */
export class NavigationProgressController {
  constructor(
    private readonly tracker: LocationTracker,
    private readonly matcher: PositionMatcher,
    private readonly session: NavigationSession,
  ) {}

  /**
   * Updates navigation using current location.
   */
  update(): void {
    const location =
      this.tracker.getCurrentLocation();

    if (!location) {
      return;
    }

    const route =
      this.session.getRoute();

    const step =
      this.matcher.match(
        location,
        route,
      );

    if (!step) {
      return;
    }

    this.session.updateStep(
      step.id,
    );
  }
}
