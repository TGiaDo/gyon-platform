import type {
  LocationFix,
  NavigationInstruction,
  Route,
  WatchNavigationMessage,
} from "@gyon/contracts";

import type {
  NavigationBridge,
  VoiceAdapter,
} from "@gyon/contracts";

import type {
  NavigationEngine,
} from "@gyon/core";

/**
 * iPhone companion navigation application.
 */
export class IphoneNavigationApp {
  private currentRoute:
    Route | null = null;

  constructor(
    private readonly engine:
      NavigationEngine,

    private readonly bridge:
      NavigationBridge,

    private readonly voice:
      VoiceAdapter,
  ) {}

  /**
   * Starts navigation using a route.
   */
  async startNavigation(
    route: Route,
  ): Promise<void> {
    this.currentRoute = route;
    this.voice.speak(
      "Navigation started.",
    );

    const message: WatchNavigationMessage = {
      route,
      stepId: route.legs[0]?.steps[0]?.id ?? "",
      maneuver:
        route.legs[0]?.steps[0]?.maneuver ??
        "depart",
      text:
        this.instructionText(
          route.legs[0]?.steps[0],
        ),
      distanceMeters:
        route.legs[0]?.steps[0]?.distance
          .meters ?? 0,
      street:
        route.legs[0]?.steps[0]?.street ??
        "Unknown",
      etaMilliseconds:
        route.legs[0]?.steps[0]?.duration
          .milliseconds ?? 0,
      status: "started",
    };

    this.bridge.send(
      message,
    );
  }

  /**
   * Updates the watch display with a navigation instruction.
   */
  updateInstruction(
    instruction: NavigationInstruction,
    route: Route,
    stepId: string,
    street: string,
    etaMilliseconds: number,
    status: string,
  ): void {
    const message: WatchNavigationMessage = {
      route,
      stepId,
      maneuver: instruction.maneuver,
      text: instruction.text,
      distanceMeters:
        instruction.distance.meters,
      street,
      etaMilliseconds,
      status: status as any,
    };

    this.bridge.send(
      message,
    );
  }

  private instructionText(
    step:
      Route["legs"][0]["steps"][number] | undefined,
  ): string {
    if (!step) {
      return "Continue";
    }

    return step.maneuver === "arrive"
      ? "You have arrived"
      : `Follow ${step.street ?? "the route"}`;
  }
}
