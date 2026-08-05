/**
 * Provides voice guidance output.
 *
 * Implementations may use:
 * - native text-to-speech engines
 * - wearable voice services
 * - companion voice assistants
 */
export interface VoiceAdapter {

  /**
   * Speaks a message through the device voice channel.
   */
  speak(
    text: string,
  ): void;
}
