import type {
  Coordinate,
  Route,
} from "@gyon/contracts";

import {
  RouteProviderRegistry,
} from "./provider/index.js";

import { NavigationSession } from "./navigation-session.js";

/**
 * Creates and manages navigation sessions.
 */
export class NavigationEngine {
  /**
   * Creates a new navigation session.
   */
  createSession(route: Route): NavigationSession {
    return new NavigationSession(route);
  }


  /**
   * Calculates a route using
   * the registered provider.
   */
  async calculateRoute(
    origin: Coordinate,
    destination: Coordinate,
  ): Promise<Route> {

    return RouteProviderRegistry
      .get()
      .calculate(
        origin,
        destination,
      );

  }
}
