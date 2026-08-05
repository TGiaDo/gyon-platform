import type { Route } from "@gyon/contracts";

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
}
