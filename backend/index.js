const WebSocket = require('ws');
const Influx = require('influx');
const http = require('http');
const express = require('express');
const trilateration = require('./trilateration');

const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/getToolPos', async (req, res) => res.json(await getPos(req.query.toolId)));

async function getPos(toolId) {
  console.log("getPos of",toolId);
  // let query = `  SELECT MEDIAN("rssi") FROM "b2dping" WHERE ("tool_id" = ${Influx.escape.stringLit(toolId)}) AND time >= now() - 1m GROUP BY "recv_bd_addr"`
  // console.log(query)

  let rssis = await influx.query(`SELECT median("rssi") FROM "b2dping" WHERE ("tool_id" = '1.2') AND time >= now() - 1m GROUP BY "recv_bd_addr"`);
  let loc = trilateration.trilat(rssis);

  // return loc;

  return {x: 0, y: 1.5};
}

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

const server = http.createServer(app);
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

console.log("Listening...");
server.listen(8081);
