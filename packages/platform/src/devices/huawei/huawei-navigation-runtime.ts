import type {
  Route,
} from "@gyon/contracts";

import {
  DeviceNavigationRuntime,
} from "../../navigation/device-navigation-runtime.js";

import {
  HuaweiWatchAdapter,
} from "./huawei-watch-adapter.js";

import type {
  WatchNavigationRuntime,
} from "@gyon/core";


/**
 * Huawei Watch navigation facade.
 *
 * Provides Huawei device level API.
 */
export class HuaweiNavigationRuntime {


  constructor(
    private readonly deviceRuntime:
      DeviceNavigationRuntime,

    readonly adapter:
      HuaweiWatchAdapter,
  ) {}



  /**
   * Starts navigation.
   */
  start(
    route: Route,
  ): void {

    this.deviceRuntime.start(
      route,
    );
  }



  /**
   * Stops navigation.
   */
  stop(): void {

    this.deviceRuntime.stop();
  }



  /**
   * Pauses navigation.
   */
  pause(): void {

    this.deviceRuntime.pause();
  }



  /**
   * Resumes navigation.
   */
  resume(): void {

    this.deviceRuntime.resume();
  }



  /**
   * Returns active session.
   */
  getSession() {

    return this.deviceRuntime.getSession();
  }
}
