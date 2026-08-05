import {
  LocationRuntimeFactory,
} from "../../location/provider/location-runtime-factory.js";

import {
  LocationTracker,
} from "@gyon/core";

import {
  PositionMatcher,
} from "@gyon/core";

import {
  NavigationRuntime,
} from "@gyon/core";

import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";


/**
 * Creates complete navigation runtime.
 *
 * Platform entry point for navigation.
 */
export class NavigationRuntimeFactory {


  static create(
    provider:
      LocationProviderType,
  ): NavigationRuntime {


    const locationService =
      LocationRuntimeFactory.create(
        provider,
      );


    const tracker =
      new LocationTracker(
        locationService,
      );


    const matcher =
      new PositionMatcher();


    return new NavigationRuntime(
      tracker,
      matcher,
    );

  }

}
