import type {
  WatchNavigationMessage,
} from "@gyon/contracts";

/**
 * Renders watch navigation state.
 */
export class WatchNavigationScreen {

  /**
   * Shows the current navigation state.
   */
  render(
    message: WatchNavigationMessage,
  ): void {

    console.clear();

    console.log(
      "=== Huawei Watch Navigation ===",
    );
    console.log(
      `Status: ${message.status}`,
    );
    console.log(
      `Instruction: ${message.text}`,
    );
    console.log(
      `Distance remaining: ${this.formatDistance(
        message.distanceMeters,
      )}`,
    );
    console.log(
      `Street: ${message.street}`,
    );
    console.log(
      `ETA: ${this.formatEta(
        message.etaMilliseconds,
      )}`,
    );
    console.log(
      "==============================",
    );

  }

  /**
   * Renders a single navigation instruction.
   */
  renderInstruction(
    instruction: {
      readonly text: string;
    },
  ): void {

    console.clear();
    console.log("=== Huawei Watch Navigation ===");
    console.log(`Instruction: ${instruction.text}`);
    console.log("==============================");

  }

  /**
   * Clears the watch display.
   */
  clear(): void {

    console.clear();

  }


  private formatDistance(
    meters: number,
  ): string {

    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }

    return `${Math.round(meters)} m`;

  }


  private formatEta(
    milliseconds: number,
  ): string {

    const minutes =
      Math.ceil(
        milliseconds / 60000,
      );

    return `${minutes} min`;

  }

}
