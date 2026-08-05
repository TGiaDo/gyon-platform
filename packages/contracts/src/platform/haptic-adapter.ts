/**
 * Provides vibration feedback.
 *
 * Examples:
 * - Watch vibration motor
 * - Phone haptic engine
 */
export interface HapticAdapter {

  /**
   * Triggers vibration feedback.
   */
  vibrate(
    durationMs: number,
  ): void;
}
