import {
  DevicePlatformBootstrap,
} from "../devices/bootstrap/device-platform-bootstrap.js";


/**
 * Main platform initialization runtime.
 *
 * Initializes all platform services.
 */
export class PlatformRuntime {


  private static initialized =
    false;



  /**
   * Initializes Gyon platform.
   */
  static initialize(): void {


    if (
      PlatformRuntime.initialized
    ) {
      return;
    }


    DevicePlatformBootstrap.initialize();


    PlatformRuntime.initialized =
      true;

  }



  /**
   * Returns initialization state.
   */
  static isInitialized(): boolean {

    return PlatformRuntime.initialized;

  }

}
