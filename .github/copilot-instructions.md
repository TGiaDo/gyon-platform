# Gyon Platform - Copilot Instructions

## Project Identity

Gyon is a phone-centric navigation platform.

The iPhone is the navigation source of truth.
The watch is a companion device receiving navigation updates.

## Architecture

Monorepo:
- pnpm workspace
- turborepo

Main layers:

packages/contracts
- Shared domain contracts
- Navigation messages
- Location models

packages/core
- Navigation engine
- Navigation session
- Guidance logic
- Location tracking
- Watch runtime

packages/platform
- Platform abstraction
- Device services
- Bridge layer
- Runtime services

apps/iphone
- TypeScript iPhone application layer

apps/watch
- Watch companion layer

apps/iphone-native
- Native SwiftUI iOS host application

## Current Status

Completed:
- Repository foundation
- Core architecture
- Navigation contracts
- Platform foundation
- Native iOS SwiftUI MVP shell
- iPhone simulator build

Current native iOS status:
- SwiftUI shell running
- ContentView exists
- RouteProvider exists
- NavigationModel exists
- LocationManager exists
- VoiceManager exists
- NotificationManager exists
- BluetoothManager exists

Current gap:
- UI is not fully connected to NavigationModel
- Navigation flow needs integration

## Development Rules

Before changing architecture:

1. Inspect existing modules
2. Explain impact
3. Keep boundaries clean

Development workflow:

Inspect
→ Plan
→ Implement
→ Build
→ Test
→ Commit

Never:
- Move responsibilities between layers without discussion
- Make watch the navigation source
- Put business logic inside SwiftUI Views

## iOS Development

Target:
Native SwiftUI iPhone application.

Preferred:
- MVVM pattern
- Small focused services
- MapKit integration
- Native iOS APIs

Before commit:

Build:
xcodebuild

Verify:
Simulator run

## Git Rules

Commit format:

feat(module): description
fix(module): description
docs(module): description

Keep commits small and meaningful.
