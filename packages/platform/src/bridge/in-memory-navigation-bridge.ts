import type {
  NavigationBridge,
  WatchNavigationMessage,
} from "@gyon/contracts";

/**
 * In-memory channel for paired device navigation.
 *
 * This implementation is used for testing and
 * simulation. A production implementation may
 * use Huawei Health, Bluetooth, or native pairing.
 */
export class InMemoryNavigationBridge
  implements NavigationBridge {

  private readonly listeners = new Set<(
    message: WatchNavigationMessage,
  ) => void>();

  /**
   * Sends a navigation message to all listeners.
   */
  send(
    message: WatchNavigationMessage,
  ): void {

    for (const listener of this.listeners) {
      listener(message);
    }

  }

  /**
   * Subscribes to navigation messages.
   */
  onMessage(
    listener: (
      message: WatchNavigationMessage,
    ) => void,
  ): () => void {

    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };

  }
}
