import type {
  HapticAdapter,
} from "@gyon/contracts";

/**
 * Huawei Watch haptic adapter.
 */
export class WatchHapticAdapter
  implements HapticAdapter {

  vibrate(
    durationMs: number,
  ): void {

    console.log(
      `WATCH VIBRATE ${durationMs}ms`,
    );

  }
}
