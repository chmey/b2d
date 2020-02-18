const WebSocket = require('ws');
const Influx = require('influx');
const os = require('os');
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
       tool_bd_addr: Influx.FieldType.STRING,
       receiver_bd_addr: Influx.FieldType.STRING,
       signal_strength: Influx.FieldType.INTEGER
     },
     tags: [
       'host'
     ]
   }
  ]
});

influx.createDatabase('b2dth_db');

// SELECT signal_strength FROM b2dping WHERE receiver_bd_addr='XXX' AND time >= 'XXX' AND time <= 'XXX'

influx.writePoints([
  {
    measurement: 'b2dping',
    tags: { host: os.hostname() },
    fields: { tool_bd_addr: "some:tool", receiver_bd_addr: "some:path", signal_strength: 100 },
  }
]).then(() => {
  return influx.query(`
    select * from b2dping
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `)
}).then(rows => {
  rows.forEach(row => console.log(`A request to ${row.tool_bd_addr} has a signal strength of ${row.signal_strength}`))
});


const server = http.createServer();
const wss = new WebSocket.Server({server: server})

wss.on('connection', function connection(ws) {
  console.log("New connection...");
  ws.on('message', function incoming(message) {
    console.log('received:', message);
  });

  ws.on("close", function() {
   console.log("Closing...");
 });

  // ws.send('something');
});

server.listen(8081);
























