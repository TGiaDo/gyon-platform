import SwiftUI
import MapKit

struct ContentView: View {

    @StateObject private var navigationModel = NavigationModel()

    @State private var destinationText = ""
    @State private var searchedItem: MKMapItem?

    var body: some View {

        VStack(spacing: 20) {

            Text("Gyon")
                .font(.largeTitle)
                .bold()

            Rectangle()
                .fill(Color.gray.opacity(0.3))
                .frame(height: 250)
                .overlay {
                    VStack {
                        Text("Map View")
                            .font(.title2)

                        Text(navigationModel.currentLocationDescription)
                            .font(.caption)
                    }
                }


            VStack(alignment: .leading, spacing: 8) {

                Text("Destination")
                    .font(.headline)

                TextField(
                    "Enter destination",
                    text: $destinationText
                )
                .textFieldStyle(.roundedBorder)


                Button {
                    navigationModel.searchDestination(
                        query: destinationText
                    ) { item in

                        DispatchQueue.main.async {
                            searchedItem = item

                            if let item {
                                navigationModel.calculateRoute(
                                    to: item
                                )
                            }
                        }
                    }

                } label: {

                    Text("Calculate Route")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }


            VStack(alignment: .leading, spacing: 6) {

                Text("Next Instruction")
                    .font(.headline)

                Text(
                    navigationModel.nextInstruction.isEmpty
                    ? "Waiting..."
                    : navigationModel.nextInstruction
                )


                Text(
                    "Distance: \(Int(navigationModel.remainingDistance)) m"
                )


                Text(
                    "ETA: \(Int(navigationModel.etaSeconds)) sec"
                )
            }
            .frame(
                maxWidth: .infinity,
                alignment: .leading
            )


            Button {

                navigationModel.startNavigation()

            } label: {

                Text("Start Navigation")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .disabled(searchedItem == nil)

        }
        .padding()
        .onAppear {

            navigationModel.start()

        }
    }
}


#Preview {
    ContentView()
}
