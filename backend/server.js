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
const countries = require ('./middleware/get-country');
const users = require('./middleware/decrement-happiness')

let stock_sched = new CronJob("00 00 18 * * 1,2,3,4,5" , function(){
  stocks.getStocks();
},
  null,
  true,
  "America/New_York"
);

let commodity_sched = new CronJob("00 45 12 * * 1,2,3,4,5,6" , function(){
  commodities.getCommodities();
},
  null,
  true,
  "America/New_York"
);

let currency_sched = new CronJob("00 00 21 * * 0,1,2,3,4,5" , function(){
  console.log("Scheduled Currency job started");
  currencies.getCurrency();
},
  null,
  true,
  "America/New_York"
);

let bond_sched = new CronJob("00 01 11 * * 1,2,3,4,5,6" , function(){
  console.log("Scheduled Bonds job started");
  bonds.getBonds();
},
  null,
  true,
  "America/New_York"
);


let company_sched = new CronJob("00 30 08 * * 5" , function(){
  companies.getCompanies();
},
  null,
  true,
  "America/New_York"
);


let decrement_happiness = new CronJob("0 * * * *" , function(){
    users.decrementHappiness();
  },
  null,
  true,
  "America/New_York"
);


//Uncomment this if you want to update the country array.
//countries.getCountries();

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
