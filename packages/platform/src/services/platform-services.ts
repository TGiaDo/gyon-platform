/**
 * Platform service identifiers.
 */
export const PlatformServices = {

  LOCATION:
    "location",

} as const;


export type PlatformServiceKey =
  typeof PlatformServices[keyof typeof PlatformServices];
