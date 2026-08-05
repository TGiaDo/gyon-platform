import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";


/**
 * Platform initialization options.
 */
export interface PlatformRuntimeOptions {

  /**
   * Location provider.
   *
   * Default:
   * simulator
   */
  provider?:
    LocationProviderType;

}
