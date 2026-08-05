import {
  PlatformRuntime,
} from "../runtime/platform-runtime.js";

import {
  PlatformServices,
} from "../services/platform-services.js";


import type {
  LocationService,
} from "@gyon/core";


import type {
  NavigationRuntime,
} from "@gyon/core";


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
  static initialize():
    GyonPlatform {


    PlatformRuntime.initialize();


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
    NavigationRuntime {


    const runtime =
      PlatformRuntime
        .getContainer()
        .get<NavigationRuntime>(
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
