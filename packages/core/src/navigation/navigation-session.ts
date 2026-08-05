import type {
  NavigationEvent,
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

  private listeners = new Set<
    (event: NavigationEvent) => void
  >();

  constructor(
    private readonly route: Route,
  ) {}

  /**
   * Emits navigation event.
   */
  private emit(event: NavigationEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  /**
   * Starts navigation.
   */
  start(): void {
    if (this.state !== "idle") {
      throw new Error("Navigation session already started");
    }

    this.state = "started";
    this.emit("started");
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
    this.emit("activated");
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
    this.emit("arrived");
  }

  /**
   * Cancels navigation.
   */
  cancel(): void {
    this.state = "cancelled";
    this.emit("cancelled");
  }

  /**
   * Subscribes to navigation events.
   */
  onEvent(
    listener: (event: NavigationEvent) => void,
  ): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
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
   * Advances navigation to the next route step.
   */
  advanceStep(): void {
    const steps = this.route.legs[0]?.steps ?? [];

    if (this.currentStepIndex >= steps.length - 1) {
      throw new Error("No next route step");
    }

    this.currentStepIndex += 1;
    this.emit("step-changed");
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
