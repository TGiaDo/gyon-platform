import SwiftUI

@main
struct GyonIphoneApp: App {
  @StateObject private var model = NavigationModel()

  var body: some Scene {
    WindowGroup {
      ContentView()
        .environmentObject(model)
        .onAppear {
          model.start()
        }
    }
  }
}
