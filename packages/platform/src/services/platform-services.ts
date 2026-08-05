/**
 * Platform service identifiers.
 */
export const PlatformServices = {

  LOCATION:
    "location",

  NAVIGATION:
    "navigation",

} as const;


export type PlatformServiceKey =
  typeof PlatformServices[keyof typeof PlatformServices];
