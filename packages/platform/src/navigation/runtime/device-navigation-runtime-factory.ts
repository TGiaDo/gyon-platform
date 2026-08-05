import {
  DeviceNavigationRuntime,
} from "../device-navigation-runtime.js";


import {
  WatchNavigationRuntime,
  NavigationRuntime,
  LocationTracker,
  PositionMatcher,
  NavigationRuntimeAutoUpdater,
  NavigationSessionController,
} from "@gyon/core";


import {
  LocationRuntimeFactory,
} from "../../location/provider/location-runtime-factory.js";


import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";



/**
 * Creates device navigation runtime.
 */
export class DeviceNavigationRuntimeFactory {


  static create(
    provider:
      LocationProviderType,
  ):
    DeviceNavigationRuntime {


    const locationService =
      LocationRuntimeFactory.create(
        provider,
      );


    const tracker =
      new LocationTracker(
        locationService,
      );


    const navigationRuntime =
      new NavigationRuntime(
        tracker,
        new PositionMatcher(),
      );


    const updater =
      new NavigationRuntimeAutoUpdater(
        tracker,
        navigationRuntime,
      );


    const controller =
      new NavigationSessionController(
        navigationRuntime,
        tracker,
        updater,
      );


    const watchRuntime =
      new WatchNavigationRuntime(
        controller,
      );


    return new DeviceNavigationRuntime(
      watchRuntime,
    );

  }

}
