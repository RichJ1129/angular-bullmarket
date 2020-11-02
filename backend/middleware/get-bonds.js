const express = require("express");
const Bond = require("../models/bond");
const router = express.Router();
const axios = require('axios');

//AP to be determined here
/*
const params = {
  access_key: process.env.STOCK_KEY,
  exchange: 'ARCX'
}*/

//Ticker, Name, etfPrice, commodityUnit
const bonds = [
  ['Afghanistan', '15.00', '6.30'],
  ['Albania', '0.50', '1.30'],
  ['Algeria', '3.75', '2.20'],
  ['Angola', '15.50', '23.40'],
  ['Argentina', '36.90', '39.20'],
  ['Armenia', '4.25', '1.80'],
  ['Australia', '0.86', '-0.30'],
  ['Austria', '-0.35', '1.40'],
  ['Azerbaijan', '6.50', '2.90'],
  ['Bahrain', '3.16', '-3.6'],
  ['Bangladesh', '7.55', '5.70'],
  ['Belarus', '7.75', '5.60'],
  ['Belgium', '-0.28', '0.90'],
  ['Benin', '4.00', '3.90'],
  ['Bolivia', '3.34', '1.40'],
  ['Bosnia and Herzegovina', '3.05', '1.30'],
  ['Botswana', '3.63', '1.40'],
  ['Brazil', '7.20', '2.40'],
  ['Bulgaria', '0.28', '1.28'],
  ['Burkina Faso', '4.00', '1.10'],
  ['Burundi', '6.00', '7.70'],
  ['Cambodia', '1.50', '3.20'],
  ['Cameroon', '3.25', '2.40'],
  ['Canada', '0.54', '0.10'],
  ['Chad', '3.25', '3.50'],
  ['Chile', '2.67', '2.40'],
  ['China', '3.11', '2.40'],
  ['Colombia', '5.15', '1.90'],
  ['Congo', '18.50', '28.70'],
  ['Costa Rica', '0.75', '0.10'],
  ['Croatia', '0.83', '-0.20'],
  ['Cyprus', '0.59', '-1.20'],
  ['Cuba', '2.25', '5.70'],
  ['Czech Republic', '0.83', '3.30'],
  ['Denmark', '-0.42', '0.50'],
  ['Dominican Republic', '3.00', '4.80'],
  ['Ecuador', '9.12', '0.80'],
  ['Egypt', '15.18', '-3.40'],
  ['El Salvador', '4.18', '-0.30'],
  ['Eritrea', 'N/A', '-27.60'],
  ['Estonia', '0.00', '-0.90'],
  ['Ethiopia', '7.00', '20.00'],
  ['Finland', '-0.35', '0.20'],
  ['France', '-0.25', '0.10'],
  ['Georgia', '8.00', '3.80'],
  ['Germany', '-0.50', '0.20'],
  ['Ghana', '14.50', '10.50'],
  ['Greece', '1.01', '1.90'],
  ['Guatemala', '1.75', '2.90'],
  ['Guinea', '11.50', '11.30'],
  ['Honduras', '3.75', '3.20'],
  ['Hungary', '2.42', '3.90'],
  ['Iceland', '2.66', '3.50'],
  ['India', '5.99', '6.70'],
  ['Indonesia', '6.99', '1.40'],
  ['Iran', '18.00', '34.40'],
  ['Iraq', '4.00', '0.70'],
  ['Ireland', '-0.17', '1.00'],
  ['Israel', '0.66', '0.80'],
  ['Italy', '0.85', '0.50'],
  ['Ivory Coast', '4.00', '2.70'],
  ['Jamaica', '0.50', '5.60'],
  ['Japan', '0.01', '-0.20'],
  ['Jordan', '4.68', '-0.60'],
  ['Kazakhstan', '9.00', '7.00'],
  ['Kenya', '12.02', '4.20'],
  ['Kuwait', '1.50', '1.90'],
  ['Kyrgyzstan', '5.00', '5.00'],
  ['Laos', '3.00', '5.10'],
  ['Lebanon', '4.53', '120.00'],
  ['Libya', '3.00', '1.30'],
  ['Lithuania', '0.14', '1.30'],
  ['Madagascar', '9.50', '4.00'],
  ['Malawi', '13.50', '7.60'],
  ['Malaysia', '2.76', '1.40'],
  ['Mexico', '5.84', '4.10'],
  ['Mongolia', '9.00', '2.10'],
  ['Morocco', '2.35', '0.90'],
  ['Namibia', '10.95', '2.40'],
  ['Nepal', '5.00', '4.80'],
  ['Netherlands', '-0.39', '0.70'],
  ['New Zealand', '0.48', '1.50'],
  ['Nicaragua', '10.00', '3.60'],
  ['Niger', '4.00', '2.60'],
  ['Nigeria', '9.00', '13.20'],
  ['Norway', '0.65', '1.70'],
  ['Oman', '0.50', '1.35'],
  ['Pakistan', '9.64', '9.00'],
  ['Panama', '1.36', '-2.40'],
  ['Paraguay', '0.75', '1.60'],
  ['Peru', '4.25', '1.80'],
  ['Philippines', '3.09', '2.40'],
  ['Poland', '1.33', '3.20'],
  ['Portugal', '0.25', '-0.10'],
  ['Romania', '3.50', '2.70'],
  ['Russia', '6.27', '3.60'],
  ['Rwanda', '4.50', '10.90'],
  ['Saudi Arabia', '1.00', '6.20'],
  ['Senegal', '4.00', '3.00'],
  ['Serbia', '3.03', '1.90'],
  ['Sierra Leone', '15.00', '14.36'],
  ['Singapore', '0.84', '-0.40'],
  ['Slovakia', '-0.28', '1.40'],
  ['Somalia', 'N/A', '4.10'],
  ['South Africa', '9.48', '3.10'],
  ['South Korea', '1.45', '0.70'],
  ['Spain', '0.23', '-0.40'],
  ['Sudan', '15.80', '166.80'],
  ['Sweden', '-0.12', '0.80'],
  ['Switzerland', '-0.50', '-0.80'],
  ['Syria', 'N/A', '13.10'],
  ['Thailand', '1.33', '-0.50'],
  ['Tunisia', '6.75', '5.40'],
  ['Turkey', '14.12', '11.70'],
  ['Uganda', '14.59', '4.50'],
  ['Ukraine', '14.71', '2.50'],
  ['United Kingdom', '0.20', '0.20'],
  ['United States', '0.67', '1.30'],
  ['Uruguay', '13.80', '9.80'],
  ['Uzbekistan', '14.00', '11.70'],
  ['Venezuela', '46.58', '2358.00'],
  ['Vietnam', '2.73', '3.00'],
  ['Yemen', '27.00', '0.80'],
  ['Zambia', '32.50', '15.70'],
  ['Zimbabwe', '35.00', '761.00'],
]

function apiBondCall(curr_bond) {
  const bond = new Bond({
    countryName: curr_bond[0],
    interestRate: curr_bond[1],
    inflationRate: curr_bond[2]
  });

  Bond.count({countryName: curr_bond[0]}, function (err, count) {
    if (count > 0){
      Bond.findOneAndUpdate(
        {countryName: curr_bond[0]},
        {$push:{inflationRate: bond['inflationRate']}},
        function (error, success) {
          if(error) {
            console.log(error);
          } else {
            console.log(curr_bond[0]);
          }
        }
      );
    } else {
      bond.save();
    }
  })
}

/*
function apiCommodityCall (curr_commodity) {
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

 */

const interval = 1000;

module.exports = {
  getBonds: function () {
    for (let i = 0; i <= bonds.length - 1; i++) {
      setTimeout(function (i) {apiBondCall(bonds[i])}, interval * i, i);
    }
  }
};
