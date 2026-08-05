import type {
  NavigationGuidanceEvent,
  NavigationInstruction,
} from "@gyon/contracts";

import {
  NavigationEventStream,
} from "./navigation-event-stream.js";

import {
  NavigationSession,
} from "./navigation-session.js";

import {
  InstructionEngine,
} from "./instruction-engine.js";

import {
  PositionMatcher,
} from "./position-matcher.js";

import {
  LocationTracker,
} from "./location-tracker.js";

/**
 * Provides high-level navigation guidance.
 */
export class NavigationGuidanceService {
  private readonly instructionEngine =
    new InstructionEngine();

  private readonly events =
    new NavigationEventStream();

  constructor(
    private readonly tracker: LocationTracker,
    private readonly matcher: PositionMatcher,
    private readonly session: NavigationSession,
  ) {}

  /**
   * Subscribes to navigation guidance events.
   */
  onEvent(
    listener: (
      event: NavigationGuidanceEvent,
    ) => void,
  ): () => void {
    return this.events.subscribe(listener);
  }

  /**
   * Updates guidance state from current location.
   */
  update(): NavigationInstruction | null {
    const location =
      this.tracker.getCurrentLocation();

    if (!location) {
      return null;
    }

    const route =
      this.session.getRoute();

    const step =
      this.matcher.match(
        location,
        route,
      );

    if (!step) {
      return null;
    }

    this.session.updateStep(
      step.id,
    );

    const instruction =
      this.instructionEngine.create(
        step,
      );

    this.events.emit({
      type: "instruction",
      instruction,
    });

    return instruction;
  }

  /**
   * Returns current navigation session.
   */
  getSession(): NavigationSession {
    return this.session;
  }
}
