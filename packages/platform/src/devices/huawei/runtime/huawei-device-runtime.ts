import type {
  Route,
} from "@gyon/contracts";

import {
  LocationRuntimeFactory,
} from "../../../location/provider/location-runtime-factory.js";

import {
  NavigationRuntimeFactory,
} from "../../../navigation/runtime/navigation-runtime-factory.js";

import {
  DeviceNavigationRuntime,
} from "../../../navigation/device-navigation-runtime.js";

import {
  WatchNavigationRuntime,
  LocationTracker,
  NavigationRuntimeAutoUpdater,
  NavigationSessionController,
} from "@gyon/core";

import type {
  LocationProviderType,
} from "../../../location/provider/location-provider-factory.js";


/**
 * Huawei Watch complete runtime.
 *
 * Entry point for Huawei wearable devices.
 */
export class HuaweiDeviceRuntime {

  private readonly runtime:
    DeviceNavigationRuntime;


  constructor(
    provider:
      LocationProviderType = "huawei",
  ) {

    const locationService =
      LocationRuntimeFactory.create(
        provider,
      );


    const navigationRuntime =
      NavigationRuntimeFactory.create(
        provider,
      );


    const tracker =
      new LocationTracker(
        locationService,
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


    this.runtime =
      new DeviceNavigationRuntime(
        watchRuntime,
      );
  }



  start(
    route: Route,
  ): void {

    this.runtime.start(
      route,
    );

  }



  stop(): void {

    this.runtime.stop();

  }



  pause(): void {

    this.runtime.pause();

  }



  resume(): void {

    this.runtime.resume();

  }



  getSession() {

    return this.runtime.getSession();

  }

}
