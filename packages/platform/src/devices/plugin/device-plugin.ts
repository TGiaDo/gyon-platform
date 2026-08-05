import type {
  Route,
} from "@gyon/contracts";

import type {
  DeviceCapability,
} from "../capabilities/device-capability.js";

import type {
  LocationProviderType,
} from "../../location/provider/location-provider-factory.js";


/**
 * Runtime instance created by device plugins.
 */
export interface DeviceRuntime {


  start(
    route: Route,
  ): void;


  stop(): void;


  pause(): void;


  resume(): void;

}



/**
 * Device plugin contract.
 */
export interface DevicePlugin {


  id: string;


  capability:
    DeviceCapability;


  createRuntime(
    provider:
      LocationProviderType,
  ):
    DeviceRuntime;

}
