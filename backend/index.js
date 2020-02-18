const WebSocket = require('ws');
const Influx = require('influx');
const http = require('http');

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'b2dth_db',
  port: 8086,
  username: 'connor',
  password: 'pa$$w0rd',
  schema: [
   {
     measurement: 'b2dping',
     fields: {
       rssi: Influx.FieldType.INTEGER,
     },
     tags: [
       'tool_id',
       'recv_bd_addr'
     ]
   }
  ]
});

influx.createDatabase('b2dth_db');

// SELECT signal_strength FROM b2dping WHERE receiver_bd_addr='XXX' AND time >= 'XXX' AND time <= 'XXX'

const server = http.createServer();
const wss = new WebSocket.Server({server: server})

wss.on('connection', function connection(ws) {
  console.log("New connection...");
  ws.on('message', function incoming(message) {
    console.log('received:', message);

    let data = JSON.parse(message);
    influx.writePoints([
      {
        measurement: 'b2dping',
        time: +new Date,
        tags: { tool_id: data.tool_id, recv_bd_addr: data.recv_bd_addr },
        fields: {rssi: data.rssi },
      }
    ])
  });

  ws.on("close", function() {
   console.log("Closing...");
 });

});

server.listen(8081);
