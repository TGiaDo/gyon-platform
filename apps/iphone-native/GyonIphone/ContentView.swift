import SwiftUI

struct ContentView: View {

    @State private var destination: String = ""

    var body: some View {
        NavigationView {

            VStack(spacing: 20) {

                Text("Gyon")
                    .font(.largeTitle)
                    .bold()

                Rectangle()
                    .fill(Color.gray.opacity(0.3))
                    .frame(height: 300)
                    .overlay {
                        Text("Map View")
                            .font(.title2)
                    }

                VStack(alignment: .leading) {

                    Text("Current Location")
                        .font(.headline)

                    Text("Waiting for GPS...")
                        .foregroundColor(.secondary)

                }
                .frame(maxWidth: .infinity, alignment: .leading)


                TextField(
                    "Enter destination",
                    text: $destination
                )
                .textFieldStyle(.roundedBorder)


                Button {

                    print("Start navigation to \(destination)")

                } label: {

                    Text("Start Navigation")
                        .frame(maxWidth: .infinity)

                }
                .buttonStyle(.borderedProminent)

            }
            .padding()
            .navigationTitle("Gyon")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
