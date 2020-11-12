const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const cron = require('node-cron');
const crontab = require('node-crontab');
const stocks = require('./middleware/get-stocks');
const commodities = require('./middleware/get-commodities');
const bonds = require('./middleware/get-bonds')
const companies = require('./middleware/get-company');
const currencies = require('./middleware/get-currency');
const CronJob = require('cron').CronJob;

// let stock_sched = new CronJob("00 18 * * 1,2,3,4,5" , function(){
//   stocks.getStocks();
// },{
//   schedule: true,
//   timezone: "America/New_York"
// });

// let commodity_sched = crontab.scheduleJob("45 01 * * 1,2,3,4,5,6" , function(){
//   commodities.getCommodities();
// },{
//   schedule: true,
//   timezone: "America/New_York"
// });

let currency_sched = new CronJob("00 21 * * 0,1,2,3,4,5" , function(){
  console.log("Scheduled Currency job started");
  currencies.getCurrency();
},
  null,
  true,
  "America/New_York"
);

// let bond_sched = crontab.scheduleJob("32 20 * * 1,2,3,4,5,6" , function(){
//   console.log("Scheduled Bonds job started");
//   bonds.getBonds();
// },{
//   schedule: true,
//   timezone: "America/New_York"
// });

// crontab.scheduleJob("30 08 * * 5" , function(){
//   companies.getCompanies();
// },{
//   schedule: true,
//   timezone: "America/New_York"
// });

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
