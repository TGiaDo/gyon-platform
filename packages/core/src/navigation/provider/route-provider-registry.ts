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
        (a, b) => {

          const healthRank = {

            healthy:
              3,

            degraded:
              2,

            offline:
              1,

          };


          const healthCompare =
            healthRank[b.metadata.health.status] -
            healthRank[a.metadata.health.status];


          if (
            healthCompare !== 0
          ) {

            return healthCompare;

          }


          const priorityCompare =
            b.metadata.priority -
            a.metadata.priority;


          if (
            priorityCompare !== 0
          ) {

            return priorityCompare;

          }


          return (
            a.metadata.health.latency -
            b.metadata.health.latency
          );

        },
      )[0];

  }



  /**
   * Returns all matching providers ordered by selection ranking.
   */
  static findAll(
    query: RouteProviderQuery,
  ):
    RouteProvider[] {

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
        (a, b) => {

          const healthRank = {

            healthy:
              3,

            degraded:
              2,

            offline:
              1,

          };


          const healthCompare =
            healthRank[b.metadata.health.status] -
            healthRank[a.metadata.health.status];


          if (
            healthCompare !== 0
          ) {

            return healthCompare;

          }


          const priorityCompare =
            b.metadata.priority -
            a.metadata.priority;


          if (
            priorityCompare !== 0
          ) {

            return priorityCompare;

          }


          return (
            a.metadata.health.latency -
            b.metadata.health.latency
          );

        },
      );

  }




  /**
   * Clears all registered providers.
   */
  static clear(): void {

    RouteProviderRegistry.providers = [];

  }

}
