import type {
  VoiceAdapter,
} from "@gyon/contracts";

/**
 * Huawei Watch voice adapter.
 */
export class WatchVoiceAdapter
  implements VoiceAdapter {

  speak(
    text: string,
  ): void {

    console.log(
      `WATCH VOICE: ${text}`,
    );

  }
}
