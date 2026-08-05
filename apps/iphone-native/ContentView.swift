import SwiftUI

struct ContentView: View {
  @EnvironmentObject var model: NavigationModel
  var body: some View {
    NavigationView {
      VStack(alignment: .leading, spacing: 16) {
        Text("Gyon iPhone Companion")
          .font(.largeTitle)
          .bold()

        Text("Status: \(model.authorizationStatusDescription)")
          .font(.headline)

        VStack(alignment: .leading, spacing: 8) {
          Text("Current Location")
            .font(.headline)
          Text(model.currentLocationDescription)
        }

        VStack(alignment: .leading, spacing: 8) {
          TextField("Search destination", text: Binding(get: { model.destinationDescription }, set: { model.destinationDescription = $0 }))
            .textFieldStyle(RoundedBorderTextFieldStyle())

          HStack {
            Button("Search") {
              model.searchDestination(query: model.destinationDescription) { item in
                if let item = item {
                  model.calculateRoute(to: item)
                }
              }
            }
            .buttonStyle(.bordered)

            Button("Start Navigation") {
              model.startNavigation()
            }
            .buttonStyle(.borderedProminent)
            .disabled(!model.canStartNavigation)
          }
        }

        VStack(alignment: .leading, spacing: 8) {
          Text("Next instruction:")
            .font(.headline)
          Text(model.nextInstruction)
          Text("Remaining: \(Int(model.remainingDistance)) m | ETA: \(Int(model.etaSeconds))s")
        }

        Spacer()
      }
      .padding()
    }
  }
}
