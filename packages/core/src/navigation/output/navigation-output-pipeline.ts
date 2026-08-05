import type {
  NavigationInstruction,
  DisplayAdapter,
  HapticAdapter,
} from "@gyon/contracts";


/**
 * Sends navigation instructions
 * to device output channels.
 */
export class NavigationOutputPipeline {

  constructor(
    private readonly display:
      DisplayAdapter,

    private readonly haptic:
      HapticAdapter,
  ) {}


  /**
   * Outputs navigation instruction.
   */
  send(
    instruction: NavigationInstruction,
  ): void {

    this.display.showInstruction(
      instruction,
    );


    this.haptic.vibrate(
      100,
    );
  }


  /**
   * Clears output.
   */
  clear(): void {

    this.display.clear();

  }
}
