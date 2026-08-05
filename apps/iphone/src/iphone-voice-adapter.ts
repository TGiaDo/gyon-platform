import type {
  VoiceAdapter,
} from "@gyon/contracts";

/**
 * iPhone voice adapter.
 */
export class IphoneVoiceAdapter
  implements VoiceAdapter {

  speak(
    text: string,
  ): void {

    console.log(
      `IPHONE VOICE: ${text}`,
    );

  }
}
