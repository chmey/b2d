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
       tool_bd_addr: Influx.FieldType.STRING,
       receiver_bd_addr: Influx.FieldType.STRING,
       uuid: Influx.FieldType.STRING,
       major: Influx.FieldType.INTEGER,
       minor: Influx.FieldType.INTEGER,
       signal_strength: Influx.FieldType.INTEGER,
     },
     tags: [
       'host'
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
        tags: { host: os.hostname() },
        fields: { uuid: data.details.uuid, major: data.details.major, minor: data.details.minor, tool_bd_addr: data.tool_bd_addr, receiver_bd_addr: data.receiver_bd_addr, signal_strength: data.rssi },
      }
    ]).then(_ => {
      influx.query(`
          select * from b2dping
          where host = ${Influx.escape.stringLit(os.hostname())}
          order by time desc
          limit 10
        `).then(rows => {
        rows.forEach(row => console.log(`${row.uuid} ${row.major}:${row.minor} - tool ${row.tool_bd_addr} to receiver ${row.receiver_bd_addr} has a signal strength of ${row.signal_strength}`))
      });
    });
  });

  ws.send('something');
});
