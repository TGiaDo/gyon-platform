# iPhone Build Checklist — Gyon iPhone App

This checklist lists every manual step required before pressing Run ▶️ in Xcode for a physical iPhone 8 (iOS 16.7.16).

Preconditions
- You have a Mac with Xcode installed (Xcode 15 recommended).
- You have the repo checked out and open in Finder/Terminal at `apps/iphone-native/GyonIphone.xcodeproj`.

1) Open the project
- Open `apps/iphone-native/GyonIphone.xcodeproj` in Xcode.

2) Signing & Team
- Select the `GyonIphone` target → `Signing & Capabilities`.
- Set `Team` to your Apple Developer account (Personal Team works for local device installs).
- Ensure `Automatically manage signing` is checked.

3) Bundle Identifier
- Confirm `Bundle Identifier` is acceptable (default: `com.gyon.iphone`).
- If you use your developer account, change the bundle identifier to one registered to your team if necessary.

4) Entitlements
- Confirm `GyonIphone.entitlements` is present in the target and matches the `Code Signing Entitlements` build setting (project already set to `GyonIphone.entitlements`).
- No additional entitlements are required for location notifications, but if you add capabilities Xcode will update entitlements.

5) Background Modes
- In `Signing & Capabilities`, press `+ Capability` → add `Background Modes`.
- Enable `Location updates` (and `Uses Bluetooth LE accessories` if you plan BLE features later).

6) Location permissions
- The app requests the following keys in `Info.plist`:
  - `NSLocationAlwaysAndWhenInUseUsageDescription`
  - `NSLocationAlwaysUsageDescription`
  - `NSLocationWhenInUseUsageDescription`
- For continuous background navigation, grant the app `Always` location in iOS Settings after install.

7) Notifications
- The app requests notification permissions at runtime via `UNUserNotificationCenter`.
- When first run, allow Notifications in the permission dialog.

8) App Icon & Assets
- The project includes a placeholder `Assets.xcassets/AppIcon.appiconset` with a minimal marketing icon only.
- Replace with a full set of app icons to remove Xcode warnings and meet App Store requirements.

9) Launch Screen
- `LaunchScreen.storyboard` is included and referenced via `UILaunchStoryboardName` in `Info.plist`.

10) Device Trust
- On the device: if using a Personal Team, you may need to trust the developer profile in `Settings → General → Device Management` before launching.

11) Build & Run
- Connect device, select it as run target, click Run ▶️.
- Xcode will build and install. If signing errors appear, open `Signing & Capabilities` and resolve them.

12) Simulating routes (optional, for testing without driving)
- Create a GPX file and add it to the project or use Simulator GPX.
- In Simulator: Features → Location → GPX File to simulate movement along a route.
- On a real device, use Xcode's GPX routing via `Debug → Simulate Location` while device connected.

13) Post-install manual steps for background navigation
- In device Settings → the app → Location → set to `Always` (required for background navigation).
- Ensure in Settings → Notifications the app is allowed to post alerts.

Troubleshooting hints
- If `CODE_SIGN_ENTITLEMENTS` or entitlements path errors appear, ensure the `GyonIphone.entitlements` file is in the project group and `Code Signing Entitlements` equals `GyonIphone.entitlements`.
- If `LaunchScreen` or `Assets` cannot be found, confirm the files exist at the project root (`apps/iphone-native/`).

If you want, I can now: 
- Replace placeholder app icons with a proper asset set, or
- Walk through the exact Xcode steps and screenshots to set signing and capabilities.
