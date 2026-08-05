import type {
  HapticAdapter,
} from "@gyon/contracts";

/**
 * iPhone haptic adapter.
 */
export class IphoneHapticAdapter
  implements HapticAdapter {

  vibrate(
    durationMs: number,
  ): void {

    console.log(
      `IPHONE VIBRATE ${durationMs}ms`,
    );

  }
}
