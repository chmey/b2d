import time
from beacontools import BeaconScanner, IBeaconFilter
import bluetooth
import json
import websockets
import asyncio

SERVER = "localhost"
PORT = 8081


async def post(output):
    uri = f"ws://{SERVER}:{PORT}"
    async with websockets.connect(uri) as websocket:
        await websocket.send(output)
        print(await websocket.recv())


def callback(bt_addr, rssi, packet, additional_info):
    output = json.dumps({'tool_bd_addr': bt_addr, 'receiver_bd_addr': bluetooth.read_local_bdaddr(), 'details': additional_info, 'rssi': rssi})
    asyncio.run(post(output))


scanner = BeaconScanner(callback, device_filter=IBeaconFilter(uuid="b2ddeadb-eef0-0000-0000-000000000000"))
scanner.start()
time.sleep(60)
scanner.stop()