import {
  PlatformRuntime,
} from "../runtime/platform-runtime.js";

import {
  PlatformServices,
} from "../services/platform-services.js";

import type {
  PlatformRuntimeOptions,
} from "../runtime/options/platform-runtime-options.js";


import type {
  LocationService,
} from "@gyon/core";


import type {
  DeviceNavigationRuntime,
} from "../navigation/device-navigation-runtime.js";


/**
 * Public application API.
 *
 * Entry point for:
 * - Huawei Watch
 * - iPhone companion
 * - Web simulator
 */
export class GyonPlatform {


  private constructor() {}



  /**
   * Initializes and returns platform API.
   */
  static initialize(
    options: PlatformRuntimeOptions = {},
  ):
    GyonPlatform {


    PlatformRuntime.initialize(
      options,
    );


    return new GyonPlatform();

  }



  /**
   * Location service facade.
   */
  get location():
    LocationService {


    const service =
      PlatformRuntime
        .getContainer()
        .get<LocationService>(
          PlatformServices.LOCATION,
        );


    if (!service) {

      throw new Error(
        "Location service unavailable",
      );

    }


    return service;

  }



  /**
   * Navigation runtime facade.
   */
  get navigation():
    DeviceNavigationRuntime {


    const runtime =
      PlatformRuntime
        .getContainer()
        .get<DeviceNavigationRuntime>(
          PlatformServices.NAVIGATION,
        );


    if (!runtime) {

      throw new Error(
        "Navigation runtime unavailable",
      );

    }


    return runtime;

  }

}
