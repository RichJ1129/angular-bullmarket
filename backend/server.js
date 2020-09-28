var path = require('path');
const port = process.env.PORT ||3000;
const express = require('express');
const app = express();

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'dist/angular-bullmarket')));

//Any routes will be redirected to the angular app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/angular-bullmarket/index.html'));
});

//Starting server on port 8081
app.listen(port, () => {
  console.log('Server started!');
  console.log(port);
});
