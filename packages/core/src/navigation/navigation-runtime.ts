import type {
  Route,
  NavigationGuidanceEvent,
  NavigationInstruction,
} from "@gyon/contracts";

import {
  NavigationSession,
} from "./navigation-session.js";

import {
  NavigationGuidanceService,
} from "./navigation-guidance-service.js";

import {
  NavigationEventStream,
} from "./navigation-event-stream.js";

import {
  LocationTracker,
} from "./location-tracker.js";

import {
  PositionMatcher,
} from "./position-matcher.js";

import {
  NavigationOutputPipeline,
} from "./output/navigation-output-pipeline.js";


/**
 * High-level navigation runtime facade.
 */
export class NavigationRuntime {
  private session?: NavigationSession;

  private guidance?: NavigationGuidanceService;

  private readonly events =
    new NavigationEventStream();


  constructor(
    private readonly tracker: LocationTracker,
    private readonly matcher: PositionMatcher,
    private readonly output?: NavigationOutputPipeline,
  ) {}


  /**
   * Starts navigation with a route.
   */
  start(
    route: Route,
  ): void {
    this.session =
      new NavigationSession(route);

    this.session.start();

    this.guidance =
      new NavigationGuidanceService(
        this.tracker,
        this.matcher,
        this.session,
      );

    this.guidance.onEvent(
      event => {
        this.events.emit(event);
      },
    );
  }


  /**
   * Updates navigation state.
   */
  update():
    NavigationInstruction | null {

    if (!this.guidance) {
      throw new Error(
        "Navigation has not started",
      );
    }

    const instruction =
      this.guidance.update();


    if (
      instruction &&
      this.output
    ) {
      this.output.send(
        instruction,
      );
    }


    return instruction;
  }


  /**
   * Subscribes to navigation events.
   */
  onEvent(
    listener: (
      event: NavigationGuidanceEvent,
    ) => void,
  ): () => void {

    return this.events.subscribe(
      listener,
    );
  }


  /**
   * Returns active session.
   */
  getSession():
    NavigationSession | undefined {

    return this.session;
  }
}
