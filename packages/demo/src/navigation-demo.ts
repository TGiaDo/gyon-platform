import {
  LocationTracker,
  LocationService,
  NavigationGuidanceService,
  NavigationPlatformRuntime,
  NavigationSession,
  PositionMatcher,
} from "@gyon/core";


import {
  NavigationDisplayService,
  PlatformAdapterManager,
} from "@gyon/core";


import {
  SimulatorLocationAdapter,
} from "@gyon/platform";


import type {
  LocationFix,
} from "@gyon/contracts";


// -----------------------
// Simulator GPS
// -----------------------

const gps =
  new SimulatorLocationAdapter();


// -----------------------
// Location Tracker
// -----------------------

const locationService =
  new LocationService(
    gps,
  );


const tracker =
  new LocationTracker(
    locationService,
  );


// -----------------------
// Fake display adapter
// -----------------------

const displayAdapter = {

  showInstruction(
    instruction: any,
  ) {

    console.log(
      "NAVIGATION:",
      instruction,
    );

  },


  clear() {
    console.log(
      "CLEAR",
    );
  },
};


// -----------------------
// Platform bridge
// -----------------------

const adapters =
  new PlatformAdapterManager(
    displayAdapter,
    locationService,
    {
      vibrate() {},
    },
  );


const display =
  new NavigationDisplayService(
    adapters,
  );


// -----------------------
// Route
// -----------------------

const route: any = {

  legs: [
    {
      steps: [
        {
          id: "step-1",
          action: "turn-right",
          distance: 100,
        },
      ],
    },
  ],
};


// -----------------------
// Navigation
// -----------------------

const session =
  new NavigationSession(
    route,
  );


const matcher =
  new PositionMatcher();


const guidance =
  new NavigationGuidanceService(
    tracker,
    matcher,
    session,
  );


const runtime =
  new NavigationPlatformRuntime(
    guidance,
    display,
  );


// -----------------------
// Simulation
// -----------------------

const location: LocationFix = {
    coordinate: {
      latitude: 10.762,
      longitude: 106.660,
    },

  accuracy: {
    meters: 5,
  },

  timestamp: {
    unixMilliseconds: Date.now(),
  },
};


gps.update(
  location,
);


tracker.start();


runtime.update();
