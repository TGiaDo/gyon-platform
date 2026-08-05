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

    const query = {

      ...(context.options?.offline !== undefined && {
        offline:
          context.options.offline,
      }),


      ...(context.options?.mode !== undefined && {
        mode:
          context.options.mode,
      }),

    };


    const provider =
      RouteProviderRegistry.find(
        query,
      );


    if (
      !provider
    ) {

      throw new Error(
        "No route provider matches requirements",
      );

    }


    return provider.calculate(
      context,
    );

  }
}
