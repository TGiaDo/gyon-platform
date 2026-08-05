import {
  LocationService,
} from "@gyon/core";

import {
  LocationProviderFactory,
  type LocationProviderType,
} from "./location-provider-factory.js";


/**
 * Creates platform location runtime services.
 */
export class LocationRuntimeFactory {


  static create(
    type: LocationProviderType,
  ): LocationService {


    const adapter =
      LocationProviderFactory.create(
        type,
      );


    return new LocationService(
      adapter,
    );

  }

}
