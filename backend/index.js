const WebSocket = require('ws');
const Influx = require('influx');
const os = require('os');


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
       // tool_bd_addr: Influx.FieldType.STRING,
       receiver_bd_addr: Influx.FieldType.STRING,
       uuid: Influx.FieldType.STRING,
       major: Influx.FieldType.INTEGER,
       minor: Influx.FieldType.INTEGER,
       signal_strength: Influx.FieldType.INTEGER,
     },
     tags: [
       'host',
       'tool_bd_addr',
       'major',
       'minor',
     ]
   }
  ]
});

influx.createDatabase('b2dth_db');

// SELECT signal_strength FROM b2dping WHERE receiver_bd_addr='XXX' AND time >= 'XXX' AND time <= 'XXX'

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // console.log('received: %s', message);
    let data = JSON.parse(message);
    influx.writePoints([
      {
        measurement: 'b2dping',
        time: +new Date,
        tags: { host: os.hostname(), tool_bd_addr: data.tool_bd_addr, major: data.details.major, minor: data.details.minor },
        fields: {uuid: data.details.uuid, receiver_bd_addr: data.receiver_bd_addr, signal_strength: data.rssi },
      }
    ]).then(_ => {
      influx.query(`SELECT mean("signal_strength") FROM "b2dping" WHERE ("host" = 'L480') GROUP BY "major", "minor"`).then(rows => {
      //     // rows are unique tool_bd_addr
      rows.forEach(row => console.log(row))
          // rows.forEach(row => console.log(`TOOL: ${row.tool_bd_addr} ${row.mean} avg`))
        // rows.forEach(row => console.log(`${row.uuid} ${row.major}:${row.minor} - tool ${row.tool_bd_addr} to receiver ${row.receiver_bd_addr} has a signal strength of ${row.signal_strength}`))
      });
    });
  });

  ws.send('something');
});
