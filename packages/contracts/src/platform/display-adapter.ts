import type {
  NavigationInstruction,
} from "../navigation/navigation-instruction.js";

/**
 * Provides navigation display output.
 *
 * Examples:
 * - Huawei Watch screen
 * - iPhone UI
 */
export interface DisplayAdapter {

  /**
   * Displays navigation instruction.
   */
  showInstruction(
    instruction: NavigationInstruction,
  ): void;


  /**
   * Clears current display.
   */
  clear(): void;
}
