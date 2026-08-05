import type { NavigationInstruction } from "./navigation-instruction.js";

/**
 * Events emitted by navigation guidance.
 */
export type NavigationGuidanceEvent =
  | {
      readonly type: "instruction";
      readonly instruction: NavigationInstruction;
    }
  | {
      readonly type: "arrived";
    };
