import type {
  NavigationGuidanceEvent,
} from "@gyon/contracts";

/**
 * Provides realtime navigation events.
 */
export class NavigationEventStream {
  private readonly listeners =
    new Set<
      (event: NavigationGuidanceEvent) => void
    >();

  /**
   * Subscribes to navigation events.
   */
  subscribe(
    listener: (
      event: NavigationGuidanceEvent,
    ) => void,
  ): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Emits a navigation event.
   */
  emit(
    event: NavigationGuidanceEvent,
  ): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
