import type {
  NavigationInstruction,
} from "@gyon/contracts";

import {
  NavigationGuidanceService,
} from "./navigation-guidance-service.js";

import {
  NavigationDisplayService,
} from "../platform/navigation-display-service.js";


/**
 * Connects navigation engine
 * with platform capabilities.
 */
export class NavigationPlatformRuntime {

  constructor(
    private readonly guidance:
      NavigationGuidanceService,

    private readonly display:
      NavigationDisplayService,
  ) {}


  /**
   * Runs one navigation update cycle.
   */
  update():
    NavigationInstruction | null {

    const instruction =
      this.guidance.update();


    if (!instruction) {
      return null;
    }


    this.display.show(
      instruction,
    );


    return instruction;
  }


  /**
   * Clears navigation output.
   */
  clear(): void {

    this.display.clear();
  }
}
