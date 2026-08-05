import type {
  NavigationInstruction,
} from "@gyon/contracts";

import {
  PlatformAdapterManager,
} from "./platform-adapter-manager.js";


/**
 * Sends navigation instructions
 * to platform display.
 */
export class NavigationDisplayService {

  constructor(
    private readonly platform:
      PlatformAdapterManager,
  ) {}


  /**
   * Displays instruction.
   */
  show(
    instruction: NavigationInstruction,
  ): void {

    this.platform
      .getDisplay()
      .showInstruction(
        instruction,
      );
  }


  /**
   * Clears display.
   */
  clear(): void {

    this.platform
      .getDisplay()
      .clear();
  }
}
