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

crontab.scheduleJob("00 18 * * 1,2,3,4,5" , function(){
  stocks.getStocks();
},{
  schedule: true,
  timezone: "America/New_York"
});

crontab.scheduleJob("45 01 * * 1,2,3,4,5,6" , function(){
  commodities.getCommodities();
},{
  schedule: true,
  timezone: "America/New_York"
});

crontab.scheduleJob("01 11 * * 1,2,3,4,5,6" , function(){
  bonds.getBonds();
},{
  schedule: true,
  timezone: "America/New_York"
});

crontab.scheduleJob("30 08 * * 5" , function(){
  companies.getCompanies();
},{
  schedule: true,
  timezone: "America/New_York"
});

crontab.scheduleJob("30 17 * * 0-5" , function(){
  currencies.getCurrency();
},{
  schedule: true,
  timezone: "America/New_York"
});

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
