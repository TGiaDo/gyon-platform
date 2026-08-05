import type {
  PlatformServiceToken,
} from "../services/platform-service-token.js";


/**
 * Platform service container.
 *
 * Holds initialized platform services.
 *
 * This is the composition root of Gyon Platform.
 */
export class PlatformContainer {


  private readonly services =
    new Map<string, unknown>();



  /**
   * Registers a service instance.
   */
  register<T>(
    token: PlatformServiceToken<T>,
    service: T,
  ): void {

    this.services.set(
      token.name,
      service,
    );

  }



  /**
   * Resolves a registered service.
   */
  get<T>(
    token: PlatformServiceToken<T>,
  ):
    T | undefined {

    return this.services.get(
      token.name,
    ) as T | undefined;

  }



  /**
   * Checks service existence.
   */
  has<T>(
    token: PlatformServiceToken<T>,
  ): boolean {

    return this.services.has(
      token.name,
    );

  }



  /**
   * Clears container.
   */
  clear(): void {

    this.services.clear();

  }

}
