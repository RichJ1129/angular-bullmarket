const express = require("express");
const Commodity = require("../models/commodity");
const router = express.Router();
const axios = require('axios');

//Uses same market stack key, currently named STOCK_KEY in AWS. Set exchange to NYSE to differentiate between
//tickers that exist in multiple exchanges
const params = {
  access_key: process.env.STOCK_KEY,
  exchange: 'ARCX'
}

//Ticker, Name, etfPrice, commodityUnit
const commodities = [
  ['GLD','Gold', 'troy ounce'],
  ['SLV','Silver', 'troy ounce'],
  ['USO','United States Oil', 'barrel'],
  ['PPLT','Platinum', 'troy ounce'],
  ['CORN','Corn', 'bushel'],
  ['SOYB','Soybeans', 'bushel'],
  ['WEAT','Wheat', 'bushel'],
  ['CANE','Sugar', 'lb'],
  ['CPER','United States Copper Index', 'lb'],
  ['BAL','Cotton Subindex', 'lb'],
  ['JJN','Nickel Subindex', 'metric ton'],
  ['JJT','Tin Subindex', 'metric ton'],
  ['JJU','Aluminum Subindex', 'metric ton'],
  ['LIT','Lithium Stocks', 'lb'],
  ['CAFE','Coffee ETN', 'lb'],
  ['NIB','Cocoa ETN', 'metric ton'],
  ['WOOD','Timber', '1000 board feet'],
  ['LD','Lead ETN', 'metric ton'],
  ['SLX','Steel ETF', 'N/A'],
  ['ZIN.XLON','Zinc ETF', 'metric ton']
]


function apiCommodityCall (curr_commodity) {
  if (curr_commodity[0] == 'ZIN.XLON')
  {
    params.exchange = 'XLON';
  }
  else if (curr_commodity[0] =='WOOD')
  {
    params.exchange = 'XNAS';
  }
  else
  {
    params.exchange = 'ARCX';
  }
  axios.get('http://api.marketstack.com/v1/tickers/' + curr_commodity[0] + '/eod/latest', {params})
    .then(response => {
      const apiResponse = response.data;
      if (typeof apiResponse === 'object') {
        const commodity = new Commodity({
          commodityName: curr_commodity[1],
          symbol: curr_commodity[0],
          etfPrice: apiResponse['close'],
          commodityUnit: curr_commodity[2],
        });
        Commodity.count({commodityName: curr_commodity[1]}, function (err, count) {
          if (count > 0){
            Commodity.findOneAndUpdate(
              {commodityName: curr_commodity[1]},
              {$push:{etfPrice: commodity['etfPrice']}},
              function (error, success) {
                if(error) {
                  console.log(error);
                } else {
                  console.log(curr_commodity[0]);
                }
              }
            );
          } else {
            commodity.save();
          }
        })
      }
    }).catch(error => {
    console.log(error);
  });
}

const interval = 1000;

module.exports = {
  getCommodities: function () {
    for (let i = 0; i <= commodities.length - 1; i++) {
      setTimeout(function (i) {apiCommodityCall(commodities[i])}, interval * i, i);
    }
  }
};



