# Gyon Platform - Claude Code Instructions

## Project Identity

Gyon is a cross-platform navigation platform.

Main goals:
- iPhone navigation application
- Huawei Watch integration
- GPS navigation
- Route guidance
- Voice navigation


## Development Philosophy

Follow:

- Architecture first
- Small incremental changes
- Test before commit
- Never break existing modules


## Repository

Root:

~/gyon-platform


Structure:

apps/
  iphone-native/

packages/
  core/
  engine/
  platform/
  sdk/


## Current Status

Latest commit:

084bf4d

Description:

feat(iphone): complete Gyon iOS MVP shell running on simulator


Completed:

- Native iOS project foundation
- SwiftUI application shell
- Simulator build
- iPhone 8 simulator running


Current milestone:

iOS MVP shell completed.


Next milestone:

MapKit + GPS Foundation


## iOS Project

Location:

apps/iphone-native


Project:

GyonIphone.xcodeproj


Scheme:

GyonIphone


Simulator:

iPhone 8

iOS:

16.4


Deployment target:

iOS 15.6


## Build Command

xcodebuild \
-workspace GyonIphone.xcodeproj/project.xcworkspace \
-scheme GyonIphone \
-destination 'platform=iOS Simulator,id=BC2C4423-C9B3-4F53-8972-AE640918512A' \
build


## Coding Rules

Before editing:

1. Inspect existing code
2. Explain proposed changes
3. Wait for approval


When editing:

- Make minimal changes
- Avoid duplicate files
- Preserve architecture
- Follow Swift best practices


## Git Rules

Commit format:

feat(scope): description


Examples:

feat(iphone): add MapKit foundation

fix(iphone): resolve location permission


Never commit:

- .DS_Store
- DerivedData
- temporary backup files


## Agent Behavior

Act as a senior developer assistant.

Always:

1. Inspect
2. Explain
3. Implement
4. Build
5. Test

Do not redesign architecture without approval.
