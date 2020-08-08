# b2d: Asset Localization using Bluetooth Low Energy

b2d is a prototype project for asset localization using bluetooth low energy beacons.

In a warehouse, mechanic workshop or another large facility localizing assets can be a time-consuming task. Our project aims to simplify finding movable tools and other objects and thus save valuable working time.

To use the system and for trying the prototype, we have installed 3 embedded beacon devices (e.g. particle argon boards) in a room. We then simulated a lost tool by a raspberry pi. The raspberry pi, here called the **reader**, continously measures the signal strength to the beacons. 

The measurements are sent to the **backend** where an ingestion to an InfluxDB and the positional calculation is performed via a trangulation algorithm. Finally, the backend displays the approximate location on an exemplary factory blueprint.

Try it out yourself and feel free to reuse any of our work under the **MIT** license.

## Instructions for the backend

### Server
Start with the backend server with:
```
npm install
npm start
```

### InfluxDB

For example, start the container with:

```
docker run -p 8086:8086 -v $PWD:/var/lib/influxdb influxdb
```

## Instructions for the Python Reader (the asset)
### Intially:
```
cd reader/python 
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Perform **scanning** requirements from https://github.com/citruz/beacontools#installation


### Start:
```
source .venv/bin/activate
python reader.py
``` 