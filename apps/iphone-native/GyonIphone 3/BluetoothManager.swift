import Foundation
import CoreBluetooth

protocol BluetoothManagerDelegate: AnyObject {
  func bluetoothManagerDidConnectWatch()
  func bluetoothManagerDidDisconnectWatch()
}

final class BluetoothManager: NSObject {
  static let shared = BluetoothManager()

  private var centralManager: CBCentralManager!
  private var watchPeripheral: CBPeripheral?
  weak var delegate: BluetoothManagerDelegate?

  private override init() {
    super.init()
    centralManager = CBCentralManager(delegate: self, queue: nil)
  }

  func send(message: Data) {
    guard let peripheral = watchPeripheral else { return }
    for service in peripheral.services ?? [] {
      for characteristic in service.characteristics ?? [] {
        if characteristic.properties.contains(.writeWithoutResponse) {
          peripheral.writeValue(message, for: characteristic, type: .withoutResponse)
          return
        }
      }
    }
  }
}

extension BluetoothManager: CBCentralManagerDelegate {
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    if central.state == .poweredOn {
      centralManager.scanForPeripherals(withServices: [CBUUID(string: "180D")], options: nil)
    }
  }

  func centralManager(
    _ central: CBCentralManager,
    didDiscover peripheral: CBPeripheral,
    advertisementData: [String: Any],
    rssi RSSI: NSNumber
  ) {
    if peripheral.name?.contains("Huawei") == true || peripheral.name?.contains("Watch") == true {
      centralManager.stopScan()
      watchPeripheral = peripheral
      peripheral.delegate = self
      centralManager.connect(peripheral, options: nil)
    }
  }

  func centralManager(
    _ central: CBCentralManager,
    didConnect peripheral: CBPeripheral
  ) {
    delegate?.bluetoothManagerDidConnectWatch()
    peripheral.discoverServices(nil)
  }

  func centralManager(
    _ central: CBCentralManager,
    didDisconnectPeripheral peripheral: CBPeripheral,
    error: Error?
  ) {
    delegate?.bluetoothManagerDidDisconnectWatch()
    centralManager.scanForPeripherals(withServices: [CBUUID(string: "180D")], options: nil)
  }
}

extension BluetoothManager: CBPeripheralDelegate {
  func peripheral(
    _ peripheral: CBPeripheral,
    didDiscoverServices error: Error?
  ) {
    guard let services = peripheral.services else { return }
    for service in services {
      peripheral.discoverCharacteristics(nil, for: service)
    }
  }
}
