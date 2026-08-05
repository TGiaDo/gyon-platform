# Running Gyon iPhone App

This document explains how to open, configure, build, and run the native iPhone navigation MVP.

Requirements
- Xcode 15 or later (Xcode 14 may also work for iOS 16 targets).
- An Apple Developer account if you plan to run on a physical device.
- iPhone 8 running iOS 16.7.16 (for device testing).

Open in Xcode
1. Open the workspace/folder:
   - In Finder, open `/workspaces/gyon-platform/apps/iphone-native/GyonIphone.xcodeproj`
   - Or run in Terminal:

```bash
open apps/iphone-native/GyonIphone.xcodeproj
```

Configure signing and capabilities
1. Select the `GyonIphone` target in Xcode.
2. In the `Signing & Capabilities` tab:
   - Choose your `Team` (Apple Developer account).
   - If you don't have a team, select your personal team.
   - Ensure `Automatically manage signing` is enabled.
3. Background Modes:
   - Add the `Background Modes` capability and enable `Location updates`.
4. Entitlements:
   - The project includes a placeholder `GyonIphone.entitlements`. Xcode will wire it into signing when you choose a Team.

Build and run on device
1. Connect your iPhone 8 to the Mac.
2. Select the device in the run target selector.
3. Click the Run ▶️ button. Xcode will build and install the app.

Simulator testing
- To test basic UI and MapKit features, choose a simulator (e.g., iPhone 8) and run.
- To simulate location and routes in Simulator:
  1. Run the app in the Simulator.
  2. In the Simulator menu: Features → Location → Custom Location or select a GPX file with a route.
  3. You can create a GPX file in Xcode (File → New → File → GPX) and simulate a route; this is helpful to exercise navigation.

Permissions
- The app requests Location and Notification permissions on first run. Approve them to enable navigation and notifications.
- Background location: to test background navigation, you must enable Background Modes → Location updates and allow `Always` location permission for the app in Settings.

Notes and troubleshooting
- App icon: a placeholder asset is provided. Xcode may warn about missing icon sizes; this does not prevent building.
- If Xcode complains about missing assets or entitlements, open the target `Signing & Capabilities` and fix the configuration.
- To run on device you must register the bundle identifier (`com.gyon.iphone`) on your Apple Developer Portal if using App Store provisioning profiles.

Simulator GPX quick example
Create a GPX file `example.gpx` with a simple track and add it to Xcode. In the Simulator, choose Features → Location → GPX File → `example.gpx` to simulate movement along the route. This triggers `CLLocationManager` updates and lets you test automatic step progression and rerouting.

Contact
If you run into issues opening the project or need me to finish additional Xcode project polishing (app icons, full entitlements, or CI integration), let me know and I'll continue.
