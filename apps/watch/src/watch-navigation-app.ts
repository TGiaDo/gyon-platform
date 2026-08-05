import type {
  HapticAdapter,
  NavigationBridge,
  VoiceAdapter,
  WatchNavigationMessage,
} from "@gyon/contracts";

import type {
  WatchNavigationRuntime,
} from "@gyon/core";

import {
  WatchNavigationScreen,
} from "./watch-navigation-screen.js";

/**
 * Huawei Watch navigation application.
 */
export class WatchNavigationApp {
  private currentMessage:
    WatchNavigationMessage | null =
      null;

  private readonly unsubscribe:
    () => void;


  constructor(
    private readonly runtime:
      WatchNavigationRuntime,

    private readonly bridge:
      NavigationBridge,

    private readonly screen:
      WatchNavigationScreen,

    private readonly haptic:
      HapticAdapter,

    private readonly voice:
      VoiceAdapter,
  ) {

    this.unsubscribe =
      this.bridge.onMessage(
        (message) => {
          this.handleMessage(
            message,
          );
        },
      );

  }


  /**
   * Disposes the watch application.
   */
  dispose(): void {

    this.unsubscribe();
    this.screen.clear();

  }


  private handleMessage(
    message: WatchNavigationMessage,
  ): void {

    if (message.route) {
      this.runtime.start(
        message.route,
      );
    }

    this.currentMessage = message;

    this.screen.render(
      message,
    );

    if (
      message.status ===
        "arrived"
    ) {
      this.haptic.vibrate(
        200,
      );
      this.voice.speak(
        "You have arrived.",
      );
    }

  }

}
