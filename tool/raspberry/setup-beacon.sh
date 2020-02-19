#!/bin/bash
UUID="b2 dd ea db ee f0 00 00 00 00 00 00 00 00 00 00"
VERSION="00 01 00 02"
MIN_INTERVAL="00 01"
MAX_INTERVAL=$MIN_INTERVAL
# beacon every $MAX_INTERVAL/0.625ms

# Set up BLE Advertising
sudo hciconfig hci0 up
sudo hciconfig hci0 noscan


# First command sets up beacon with UUID and VERSION and other stuff
sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 $UUID $VERSION C8
# Mainly set interval here, 03 for non connectable
sudo hcitool -i hci0 cmd 0x08 0x0006 $MIN_INTERVAL $MAX_INTERVAL 03 00 00 00 00 00 00 00 00 07 00
# Start Advertising
sudo hcitool -i hci0 cmd 0x08 0x000a 01
