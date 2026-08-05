import type {
  Lifecycle,
} from "../lifecycle.js";


/**
 * Registry of platform background services.
 */
export class LifecycleRegistry {

  private readonly services:
    Lifecycle[] = [];


  /**
   * Registers a lifecycle service.
   */
  register(
    service: Lifecycle,
  ): void {

    this.services.push(
      service,
    );

  }


  /**
   * Returns registered services.
   */
  getAll():
    readonly Lifecycle[] {

    return this.services;

  }


  /**
   * Clears registry.
   */
  clear(): void {

    this.services.length = 0;

  }

}
