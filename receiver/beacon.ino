int led1 = A1; // Instead of writing D0 over and over again, we'll write led1



// The battery level service allows the battery level to be monitored
// BleUuid batteryLevelService(BLE_SIG_UUID_BATTERY_SVC);

// The batteryhttps://build.particle.io/build/5e4bb15ad3979d0007aad800#save_level characteristic shows the battery level of
// BleCharacteristic batteryLevelCharacteristic("bat", BleCharacteristicProperty::NOTIFY, BleUuid(0x2A19), batteryLevelService);

// uint8_t lastBattery = 100;

void setup() {
  pinMode(led1, OUTPUT);

  BLE.on();
//   BLE.addCharacteristic(batteryLevelCharacteristic);
//   batteryLevelCharacteristic.setValue(&lastBattery, 1);

//   BleAdvertisingData advData;

//   advData.appendServiceUUID(batteryLevelService);

//   BLE.advertise(&advData);

//   BLE.setAdvertisingInterval(150);
}

// C2:87:87:10:8F:55
void loop() {
    digitalWrite(led1, HIGH);

    iBeacon beacon(1, 2, "b2ddeadbeef", -55);
    BLE.advertise(beacon);

    delay(100);

    digitalWrite(led1, LOW);

    delay(100);
}

