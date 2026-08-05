import type {
  NavigationInstruction,
  DisplayAdapter,
  HapticAdapter,
  NotificationAdapter,
  VoiceAdapter,
} from "@gyon/contracts";


/**
 * Sends navigation instructions
 * to device output channels.
 */
export class NavigationOutputPipeline {

  constructor(
    private readonly display:
      DisplayAdapter,

    private readonly haptic:
      HapticAdapter,

    private readonly notification?:
      NotificationAdapter,

    private readonly voice?:
      VoiceAdapter,
  ) {}


  /**
   * Outputs navigation instruction.
   */
  send(
    instruction: NavigationInstruction,
  ): void {

    this.display.showInstruction(
      instruction,
    );


    this.haptic.vibrate(
      100,
    );
    
    if (this.notification) {
      try {
        const id = String(Date.now());
        const title = String(instruction.maneuver || "navigation");
        const subtitle = instruction.text || "";
        const body = `${instruction.distance?.meters ?? 0} m`;
        this.notification.notify({
          id,
          title,
          subtitle,
          body,
          data: {
            distanceMeters: instruction.distance?.meters ?? 0,
          },
        });
      } catch (e) {
        // best-effort
      }
    }

    if (this.voice) {
      try {
        this.voice.speak(instruction.text);
      } catch (e) {
        // best-effort
      }
    }
  }


  /**
   * Clears output.
   */
  clear(): void {

    this.display.clear();

  }
}
