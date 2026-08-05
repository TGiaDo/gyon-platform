import type {
  RouteProvider,
} from "./route-provider.js";


/**
 * Global route provider registry.
 */
export class RouteProviderRegistry {

  private static provider?:
    RouteProvider;


  /**
   * Registers default provider.
   */
  static register(
    provider: RouteProvider,
  ): void {

    RouteProviderRegistry.provider =
      provider;

  }


  /**
   * Returns default provider.
   */
  static get():
    RouteProvider {

    if (
      !RouteProviderRegistry.provider
    ) {

      throw new Error(
        "Route provider not registered",
      );

    }

    return RouteProviderRegistry.provider;

  }

}
