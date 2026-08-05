import type {
  NavigationInstruction,
  RouteStep,
} from "@gyon/contracts";

/**
 * Converts route steps into user instructions.
 */
export class InstructionEngine {
  /**
   * Creates a navigation instruction.
   */
  create(
    step: RouteStep,
  ): NavigationInstruction {
    return {
      maneuver: step.maneuver,
      distance: step.distance,
      text: this.describe(
        step.maneuver,
        step.distance.meters,
      ),
    };
  }

  private describe(
    maneuver: string,
    meters: number,
  ): string {
    const distance =
      `${Math.round(meters)} meters`;

    switch (maneuver) {
      case "turn-left":
        return `Turn left in ${distance}`;

      case "turn-right":
        return `Turn right in ${distance}`;

      case "arrive":
        return "You have arrived";

      default:
        return `Continue for ${distance}`;
    }
  }
}
