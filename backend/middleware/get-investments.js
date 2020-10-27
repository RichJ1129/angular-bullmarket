const express = require("express");
const Stock = require("../models/investment");
const router = express.Router();
const axios = require('axios');

//This is a Stub.

//User ID, Investment Name, Investment Symbol, Purchase Price, Shares
const investments = [
    ['24315','GOLD', 'GLD', 183.42, 10],
    ['24315','SILVER', 'SLV', 183.43, 10],
    ['24315','OIL', 'USO', 27.88, 25],
    ['24315','MICROSOFT', 'MSFT', 30, 188.00],
    ['24315','NOKIA', 'NOK', 200, 2.50],
    ['24315','COSTA RICA RURAL', 'RRCOS', 1, 32500],
    ['24315','EUROS', 'EURUSD', 10000, 1.10]
  ]; 


