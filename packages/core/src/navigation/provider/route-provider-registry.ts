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

  private static providers:
    RouteProvider[] = [];


  /**
   * Registers default provider.
   */
  static register(
    provider: RouteProvider,
  ): void {

    RouteProviderRegistry.providers.push(
      provider,
    );

  }


  /**
   * Returns default provider.
   */
  static get():
    RouteProvider {

    const provider =
      RouteProviderRegistry.providers[0];


    if (
      !provider
    ) {

      throw new Error(
        "Route provider not registered",
      );

    }


    return provider;

  }



  /**
   * Finds provider matching requirements.
   */
  static find(
    query: RouteProviderQuery,
  ):
    RouteProvider | undefined {


    return RouteProviderRegistry.providers
      .find(
        (provider) => {

          const capabilities =
            provider.metadata.capabilities;


          if (
            query.offline !== undefined &&
            capabilities.offline !== query.offline
          ) {

            return false;

          }


          if (
            query.traffic !== undefined &&
            capabilities.traffic !== query.traffic
          ) {

            return false;

          }


          if (
            query.mode &&
            !capabilities.modes.includes(
              query.mode,
            )
          ) {

            return false;

          }


          return true;

        },
      );

  }


  /**
   * Finds highest priority provider matching requirements.
   */
  static findBest(
    query: RouteProviderQuery,
  ):
    RouteProvider | undefined {

    return RouteProviderRegistry.providers
      .filter(
        (provider) => {

          const capabilities =
            provider.metadata.capabilities;


          if (
            query.offline !== undefined &&
            capabilities.offline !== query.offline
          ) {

            return false;

          }


          if (
            query.traffic !== undefined &&
            capabilities.traffic !== query.traffic
          ) {

            return false;

          }


          if (
            query.mode &&
            !capabilities.modes.includes(
              query.mode,
            )
          ) {

            return false;

          }


          return true;

        },
      )
      .sort(
        (a, b) =>
          b.metadata.priority -
          a.metadata.priority,
      )[0];

  }



  /**
   * Clears all registered providers.
   */
  static clear(): void {

    RouteProviderRegistry.providers = [];

  }

}
