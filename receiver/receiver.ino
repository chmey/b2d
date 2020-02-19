TCPClient client;


// char server[] = "192.168.12.197";
char server[] = "192.168.12.1";

unsigned short port = 8081;
const size_t MAX_WS_SEND_SIZE = 120;

int led1 = A1;


BleAddress thisAddr = BleLocalDevice::getInstance().address();

// String myRandWebSocket = String(rand()*10000+10000); //attempt at random security

const size_t SCAN_RESULT_MAX = 50;
BleScanResult scanResults[SCAN_RESULT_MAX];


int connectToMyServer(String myNothing) {

  digitalWrite(led1, HIGH);
  delay(400);
  digitalWrite(led1, LOW);

  String myRandWebSocket = String(1337*10000+10000);


  if (client.connect(server, port)) {
      client.write("GET / HTTP/1.1\r\n");\
      client.write("Host: "+String(server)+"\r\n");
      client.write("Upgrade: websocket\r\n");
      client.write("Connection: Upgrade\r\n");
      client.write("Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n");
    //   client.write("Sec-WebSocket-Key: "+String(myRandWebSocket)+String(myRandWebSocket)+"==\r\n");
      client.write("Sec-WebSocket-Version: 13\r\n");
      client.write("\r\n");


       Particle.publish("successfully connected", String(myNothing), 60, PRIVATE);
      return 1;
  } else {
    Particle.publish("failed to connect to server", String(myNothing), 60, PRIVATE);
     return -1;
  }

}


int stopMyServer(String myNothing) {
    while(client.read() >= 0);
    client.stop();

    return 1;
}


void setup() {
    pinMode(led1, OUTPUT);

    Spark.function("connect", connectToMyServer);
    Spark.function("stop", stopMyServer);

    connectToMyServer("");
}

void send_str(const String& str) {
    if(str.length() < MAX_WS_SEND_SIZE) {
        client.write(byte(129));
        client.write(byte(str.length()));
        client.write(str.c_str());
    }
}

void send_char_buf(char* str, size_t len) {
    if(len < MAX_WS_SEND_SIZE) {
        client.write(byte(129));
        client.write(byte(len));
        client.write(str);
    }
}

void send_heartbeat() {
    client.write(byte(129));
    client.write(byte(1));
    client.write("A");
}

int scans_without = 0;

void ble_scan() {
    int count = BLE.scan(scanResults, SCAN_RESULT_MAX);

    for (int i = 0; i < count; i++) {
        // uint8_t buf[BLE_MAX_ADV_DATA_LEN];
        // size_t len = scanResults[i].advertisingData.get(BleAdvertisingDataType::SERVICE_UUID_128BIT_MORE_AVAILABLE, buf, BLE_MAX_ADV_DATA_LEN);

        // if (len > 0) {

            BleAddress addr = scanResults[i].address;

            // 04:1F:9B:DC:BD:DD
            // raspi-mac: DC:A6:32:7D:6F:13
            if(addr[5] == 0xDC && addr[4] == 0xA6 && addr[3] == 0x32 && addr[2] == 0x7D && addr[1] == 0x6F && addr[0] == 0x13) {
                char info[MAX_WS_SEND_SIZE];
                info[0] = 0;

                addr = thisAddr;

                snprintf(info, MAX_WS_SEND_SIZE, "{\"tool_id\": \"1.2\", \"recv_bd_addr\": \"%02X:%02X:%02X:%02X:%02X:%02X\", \"rssi\": %d}",
                    addr[5], addr[4], addr[3], addr[2], addr[1], addr[0],
                    scanResults[i].rssi);

                Particle.publish("Sending data ", String(info), 60, PRIVATE);
                // Particle.publish("Scans, without data: ", String(scans_without), 60, PRIVATE);
                send_char_buf(info, strlen(info));
                scans_without=0;
            }


                // for(int k = 0; k < scanResults[i].advertisingData.length(); ++k) {
                //     snprintf(info, MAX_WS_SEND_SIZE, "%s:%02X", info, (int) scanResults[i].advertisingData.data()[k]);
                // }



            // size_t serviceUUID(BleUuid* uuids, size_t count) const;

            // BleUuid bleUuid[5];
            // size_t c = scanResults[i].advertisingData.serviceUUID(bleUuid, 5);


            // if(c >= 1) {
            //      info[0] = 0;

            //      String str = bleUuid[0].toString();
            //      send_str(str);
            // }


            // size_t l = scanResults[i].advertisingData.deviceName(info, MAX_WS_SEND_SIZE);


            // send_char_buf(info, strlen(info));
        // }
    }

    scans_without++;
}


// C2:87:87:10:8F:55
void loop() {
    delay(50);
    digitalWrite(led1, HIGH);

    if (client.connected()) {
        ble_scan();
        // delay(50);
    } else {
        delay(200);
        digitalWrite(led1, LOW);
    }

}







    // IPAddress clientIP = client.remoteIP();
    // Particle.publish("Remote IP", String(clientIP), 60, PRIVATE);
    // Particle.publish("client write", "A", 60, PRIVATE);































