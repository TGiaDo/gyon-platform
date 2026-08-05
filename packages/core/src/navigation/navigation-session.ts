import type {
  NavigationProgress,
  NavigationState,
  Route,
} from "@gyon/contracts";

/**
 * Represents an active navigation session.
 */
export class NavigationSession {
  private state: NavigationState = "idle";

  private currentStepIndex = 0;

  constructor(
    private readonly route: Route,
  ) {}

  /**
   * Starts navigation.
   */
  start(): void {
    this.state = "started";
  }

  /**
   * Returns current navigation state.
   */
  getState(): NavigationState {
    return this.state;
  }

  /**
   * Returns current route.
   */
  getRoute(): Route {
    return this.route;
  }

  /**
   * Returns current progress.
   */
  getProgress(): NavigationProgress {
    const step =
      this.route.legs[0]?.steps[this.currentStepIndex];

    if (!step) {
      throw new Error("No active route step");
    }

    return {
      stepId: step.id,
      distanceRemaining: step.distance,
      durationRemaining: step.duration,
    };
  }
}
