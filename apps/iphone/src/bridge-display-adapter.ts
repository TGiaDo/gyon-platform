import type {
  DisplayAdapter,
  LocationFix,
  NavigationInstruction,
  Route,
} from "@gyon/contracts";
import type {
  NavigationBridge,
  WatchNavigationMessage,
} from "@gyon/contracts";
import type {
  PositionMatcher,
} from "@gyon/core";

/**
 * Sends navigation output from the iPhone
 * companion to the wearable display.
 */
export class BridgeDisplayAdapter
  implements DisplayAdapter {

  private currentLocation:
    LocationFix | null = null;

  constructor(
    private readonly bridge:
      NavigationBridge,

    private readonly route:
      Route,

    private readonly matcher:
      PositionMatcher,
  ) {}

  updateLocation(
    location: LocationFix,
  ): void {

    this.currentLocation = location;

  }

  showInstruction(
    instruction: NavigationInstruction,
  ): void {

    const location =
      this.currentLocation;

    const step =
      location &&
      this.matcher.match(
        location,
        this.route,
      );

    const message: WatchNavigationMessage = {
      route: this.route,
      stepId: step?.id ?? "",
      maneuver: instruction.maneuver,
      text: instruction.text,
      distanceMeters:
        instruction.distance.meters,
      street: step?.street ??
        "Unknown",
      etaMilliseconds:
        instruction.distance.meters * 50,
      status: "navigating",
    };

    this.bridge.send(
      message,
    );

  }

  clear(): void {
    // no-op for bridge display
  }
}
