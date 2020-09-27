

// // Include the cluster module
// var cluster = require('cluster');
//
// // Code to run if we're in the master process
// if (cluster.isMaster) {
//
//   // Count the machine's CPUs
//   var cpuCount = require('os').cpus().length;
//
//   // Create a worker for each CPU
//   for (var i = 0; i < cpuCount; i += 1) {
//     cluster.fork();
//   }
//
//   // Listen for terminating workers
//   cluster.on('exit', function (worker) {
//
//     // Replace the terminated workers
//     console.log('Worker ' + worker.id + ' died :(');
//     cluster.fork();
//
//   });
//
// // Code to run if we're in a worker process
// } else {
  var AWS = require('aws-sdk');
  var express = require('express');
  var bodyParser = require('body-parser');
  var request = require('request');

  AWS.config.region = process.env.REGION

  var sns = new AWS.SNS();
  var ddb = new AWS.DynamoDB();

  var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
  var snsTopic =  process.env.NEW_SIGNUP_TOPIC;
  var app = express();

  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(express.static("public"));

  var slvSymbol="SLV";
  var slvDate="Today";
  var slvClosePrice=25;

  // app.get('/', function(req, res) {
  //   res.render('bullmarket2', {
  //     static_path: 'static',
  //     theme: process.env.THEME || 'flatly',
  //     flask_debug: process.env.FLASK_DEBUG || 'false'
  //   });
  // });


  //Bull Market Asset Pages
  // app.get('/bonds', function(req, res) {
  //   res.render('bonds', {
  //     static_path: 'static',
  //     theme: process.env.THEME || 'flatly',
  //     flask_debug: process.env.FLASK_DEBUG || 'false'
  //   }); });

  // app.get('/commodities', function(req, res) {
  //   request('https://api.marketstack.com/v1/eod?access_key=48c665517e29fe823a293d8d31d4d277&symbols=SLV&limit=1',function(error,response,body){
  //     if(!error && response.statusCode==200){
  //       var parsedData = body;
  //
  //
  //       res.render('commodities', {
  //
  //         slvSymbol:slvSymbol,
  //         slvDate:slvDate,
  //         slvClosePrice:slvClosePrice,
  //         parsedData:parsedData,
  //
  //         static_path: 'static',
  //         theme: process.env.THEME || 'flatly',
  //         flask_debug: process.env.FLASK_DEBUG || 'false'
  //
  //
  //       }); }}) });
  //
  // https://www.freeforexapi.com/api/live?pairs=EURUSD


  //   app.get('/currency', function(req, res) {
  //
  //     request('https://www.freeforexapi.com/api/live?pairs=EURUSD',function(error,response,body){
  //       if(!error && response.statusCode==200){
  //         var parsedC = JSON.parse(body);
  //         var parsedCurrency=parsedC["rates"]["EURUSD"]["rate"]
  //
  //         res.render('currency', {
  //
  //           parsedCurrency:parsedCurrency,
  //           static_path: 'static',
  //           theme: process.env.THEME || 'flatly',
  //           flask_debug: process.env.FLASK_DEBUG || 'false'
  //         }); }}) });
  //
  // app.get('/realestate', function(req, res) {
  //   res.render('realestate', {
  //     static_path: 'static',
  //     theme: process.env.THEME || 'flatly',
  //     flask_debug: process.env.FLASK_DEBUG || 'false'
  //   }); });
  //
  // app.get('/stocks', function(req, res) {
  //   res.render('stocks', {
  //     static_path: 'static',
  //     theme: process.env.THEME || 'flatly',
  //     flask_debug: process.env.FLASK_DEBUG || 'false'
  //   }); });


  app.post('/signup', function(req, res) {
    var item = {
      'email': {'S': req.body.email},
      'name': {'S': req.body.name},
      'preview': {'S': req.body.previewAccess},
      'theme': {'S': req.body.theme}
    };

    ddb.putItem({
      'TableName': ddbTable,
      'Item': item,
      'Expected': { email: { Exists: false } }
    }, function(err, data) {
      if (err) {
        var returnStatus = 500;

        if (err.code === 'ConditionalCheckFailedException') {
          returnStatus = 409;
        }

        res.status(returnStatus).end();
        console.log('DDB Error: ' + err);
      } else {
        sns.publish({
          'Message': 'Name: ' + req.body.name + "\r\nEmail: " + req.body.email
            + "\r\nPreviewAccess: " + req.body.previewAccess
            + "\r\nTheme: " + req.body.theme,
          'Subject': 'New user sign up!!!',
          'TopicArn': snsTopic
        }, function(err, data) {
          if (err) {
            res.status(500).end();
            console.log('SNS Error: ' + err);
          } else {
            res.status(201).end();
          }
        });
      }
    });
  });

  // var port = process.env.PORT || 3000;
  //
  // var server = app.listen(port, function () {
  //   console.log('Server running at http://127.0.0.1:' + port + '/');
  // });
`// }
`
module.exports = app;



