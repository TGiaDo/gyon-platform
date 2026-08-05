import {
  PlatformServiceToken,
} from "./platform-service-token.js";


/**
 * Platform service tokens.
 */
export const PlatformServices = {

  LOCATION:
    new PlatformServiceToken(
      "location",
    ),

  NAVIGATION:
    new PlatformServiceToken(
      "navigation",
    ),

} as const;


export type PlatformServiceKey =
  typeof PlatformServices[
    keyof typeof PlatformServices
  ];
