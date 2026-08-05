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
    if (this.state !== "idle") {
      throw new Error("Navigation session already started");
    }

    this.state = "started";
  }

  /**
   * Activates active navigation.
   */
  activate(): void {
    if (this.state !== "started") {
      throw new Error(
        "Navigation session must be started first",
      );
    }

    this.state = "navigating";
  }

  /**
   * Marks navigation as completed.
   */
  complete(): void {
    if (this.state !== "navigating") {
      throw new Error(
        "Navigation session is not navigating",
      );
    }

    this.state = "arrived";
  }

  /**
   * Cancels navigation.
   */
  cancel(): void {
    this.state = "cancelled";
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
