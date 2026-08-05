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
    key: string,
    service: T,
  ): void {

    this.services.set(
      key,
      service,
    );

  }



  /**
   * Resolves a registered service.
   */
  get<T>(
    key: string,
  ):
    T | undefined {

    return this.services.get(
      key,
    ) as T | undefined;

  }



  /**
   * Checks service existence.
   */
  has(
    key: string,
  ): boolean {

    return this.services.has(
      key,
    );

  }



  /**
   * Clears container.
   */
  clear(): void {

    this.services.clear();

  }

}
