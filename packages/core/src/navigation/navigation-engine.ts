import type {
  Route,
} from "@gyon/contracts";

import type {
  RoutePlanningContext,
} from "./model/index.js";

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
    context: RoutePlanningContext,
  ): Promise<Route> {

    return RouteProviderRegistry
      .get()
      .calculate(
        context,
      );

  }
}
