/**
 * Typed platform service token.
 *
 * Used as a dependency injection key.
 */
export class PlatformServiceToken<T> {

  constructor(
    public readonly name: string,
  ) {}

}
