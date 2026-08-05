import type {
  Route,
} from "@gyon/contracts";

import {
  NavigationRuntimeFactory,
} from "../../../navigation/runtime/navigation-runtime-factory.js";

import {
  WatchNavigationRuntime,
} from "@gyon/core";

import {
  DeviceNavigationRuntime,
} from "../../../navigation/device-navigation-runtime.js";

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

    const navigation =
      NavigationRuntimeFactory.create(
        provider,
      );


    const watchRuntime =
      new WatchNavigationRuntime(
        navigation as any,
      );


    this.runtime =
      new DeviceNavigationRuntime(
        watchRuntime,
      );
  }



  /**
   * Starts navigation.
   */
  start(
    route: Route,
  ): void {

    this.runtime.start(
      route,
    );

  }



  /**
   * Stops navigation.
   */
  stop(): void {

    this.runtime.stop();

  }



  /**
   * Pauses navigation.
   */
  pause(): void {

    this.runtime.pause();

  }



  /**
   * Resumes navigation.
   */
  resume(): void {

    this.runtime.resume();

  }


  /**
   * Returns session.
   */
  getSession() {

    return this.runtime.getSession();

  }

}
