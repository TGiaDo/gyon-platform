import type {
  DisplayAdapter,
  NavigationInstruction,
} from "@gyon/contracts";

import {
  WatchNavigationScreen,
} from "./watch-navigation-screen.js";

/**
 * Displays navigation instructions on the watch screen.
 */
export class WatchDisplayAdapter
  implements DisplayAdapter {

  constructor(
    private readonly screen:
      WatchNavigationScreen,
  ) {}

  showInstruction(
    instruction: NavigationInstruction,
  ): void {

    this.screen.renderInstruction(
      instruction,
    );

  }

  clear(): void {

    this.screen.clear();

  }
}
