import type {
  RouteProviderCapabilities,
} from "./route-provider-capabilities.js";


/**
 * Route provider metadata.
 */
export interface RouteProviderMetadata {

  /**
   * Provider identifier.
   */
  id:
    string;


  /**
   * Human readable name.
   */
  name:
    string;


  /**
   * Provider capabilities.
   */
  capabilities:
    RouteProviderCapabilities;


  /**
   * Provider selection priority.
   *
   * Higher values are preferred.
   */
  priority:
    number;

}
