## Backend

Start with:
```
npm init
npm start
```


## Python Reader
### Intial:
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


## InfluxDB

Start docker with:

```
docker run -p 8086:8086 -v $PWD:/var/lib/influxdb influxdb
```
