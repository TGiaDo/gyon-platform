import type {
  RouteProvider,
} from "./route-provider.js";

import type {
  RouteProviderQuery,
} from "./model/index.js";


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



  /**
   * Finds provider matching requirements.
   */
  static find(
    query: RouteProviderQuery,
  ):
    RouteProvider | undefined {

    const provider =
      RouteProviderRegistry.provider;


    if (
      !provider
    ) {

      return undefined;

    }


    const capabilities =
      provider.metadata.capabilities;


    if (
      query.offline !== undefined &&
      capabilities.offline !== query.offline
    ) {

      return undefined;

    }


    if (
      query.traffic !== undefined &&
      capabilities.traffic !== query.traffic
    ) {

      return undefined;

    }


    if (
      query.mode &&
      !capabilities.modes.includes(
        query.mode,
      )
    ) {

      return undefined;

    }


    return provider;

  }

}
