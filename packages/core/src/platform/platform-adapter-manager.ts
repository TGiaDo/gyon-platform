import type {
  DisplayAdapter,
  LocationAdapter,
  HapticAdapter,
  NotificationAdapter,
  VoiceAdapter,
} from "@gyon/contracts";


/**
 * Provides access to platform capabilities.
 */
export class PlatformAdapterManager {

  constructor(
    private readonly display: DisplayAdapter,
    private readonly location: LocationAdapter,
    private readonly haptic: HapticAdapter,
    private readonly notification?: NotificationAdapter,
    private readonly voice?: VoiceAdapter,
  ) {}


  /**
   * Returns display adapter.
   */
  getDisplay():
    DisplayAdapter {

    return this.display;
  }


  /**
   * Returns location adapter.
   */
  getLocation():
    LocationAdapter {

    return this.location;
  }


  /**
   * Returns haptic adapter.
   */
  getHaptic():
    HapticAdapter {

    return this.haptic;
  }


  /**
   * Returns notification adapter or undefined if not provided.
   */
  getNotification():
    NotificationAdapter | undefined {

    return this.notification;
  }


  /**
   * Returns voice adapter or undefined if not provided.
   */
  getVoice():
    VoiceAdapter | undefined {

    return this.voice;
  }
}
