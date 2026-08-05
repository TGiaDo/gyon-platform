import type {
  Route,
} from "@gyon/contracts";

import type {
  RoutePlanningContext,
} from "../../model/index.js";

import type {
  RouteProvider,
} from "../route-provider.js";

import {
  ProviderHealthMonitor,
} from "../health/index.js";


/**
 * Runtime wrapper around route provider.
 */
export class RouteProviderRuntime {

  constructor(

    private readonly provider:
      RouteProvider,

    private readonly healthMonitor:
      ProviderHealthMonitor,

  ) {}


  /**
   * Executes provider calculation.
   */
  async calculate(
    context:
      RoutePlanningContext,
  ):
    Promise<Route> {

    const startedAt =
      Date.now();


    try {

      const route =
        await this.provider.calculate(
          context,
        );


      this.healthMonitor.recordSuccess(
        this.provider.metadata.id,
        Date.now() - startedAt,
      );


      return route;


    } catch(error) {

      this.healthMonitor.recordFailure(
        this.provider.metadata.id,
      );


      throw error;

    }

  }


  /**
   * Returns original provider.
   */
  getProvider():
    RouteProvider {

    return this.provider;

  }

}
