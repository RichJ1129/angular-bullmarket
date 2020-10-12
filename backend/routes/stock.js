const express = require("express");
const jwt = require("jsonwebtoken");
const Stock = require("../models/stock");
const router = express.Router();
const axios = require('axios');
const cron = require('node-cron');
const crontab = require('node-crontab');

const params = {
  access_key: ""
}

const stock_object = {
  'MELI': 'MercadoLibre',
  'BBL': 'BHP Group',
  // 'ABI.XMIL': 'Anheuser-Busch InBev',
  // 'VALE3.BVMF': 'Vale',
  // 'JBSS3.BVMF': 'JBS',
  // 'ABX.XTSE': 'Barrick Gold',
  // 'CNR.XTSE':  'Canadian National Railway',
  // 'TRI.XTSE': 'Thomson Reuters',
  // 'EC': 'Ecopetrol',
  // 'VWS.XCSE': 'Vestas Wind Systems',
  // 'NOKIA.XHEL': 'Nokia',
  // 'KNEBV.XHEL': 'Kone',
  // 'OR.XMIL': 'L\'Oreal',
  // 'LVMH.XMIL': 'LVMH Moet Hennessy Louis Vuitton',
  // 'TOT.XMIL': 'Total',
  // 'SANF.XMIL': 'Sanofi',
  // 'VOW.XFRA': 'Volkswagen',
  // 'SAP.XMIL': 'SAP',
  // 'ADS.XMIL': 'Adidas',
  // 'SIE.XMIL': 'Siemens',
  // 'BMW.XMIL': 'BMW Group',
  // 'ALV.XMIL': 'Allianz',
  // 'BASF.XMIL': 'BASF',
  // 'BAY.XMIL': 'Bayer',
  // 'TCS.XBOM': 'Tata Consultancy Services',
  // 'BHARTIARTL.XBOM': 'Bharti Airtel',
  // 'INFY.XBOM': 'Infosys',
  // 'ITC.XBOM': 'ITC',
  // 'RELIANCE.XBOM': 'Reliance Industries',
  // 'CAN': 'Accenture',
  // 'MDT': 'Medtronic',
  // 'TEVA': 'Teva Pharmaceutical',
  // // 6758.XTKS
  // // 7203.XTKS
  // // 5108.XTKS
  // // 9022.XTKS
  // // 8058.XTKS
  // // 7267.XTKS
  // // 7974.XTKS
  // 'SPOT': 'Spotify Technology',
  // 'FMXB34.BVMF': 'Femsa',
  // 'CX': 'Cemex',
  // 'AMX': 'America Movil',
  // 'R6C.XFRA': 'Royal Dutch Shell',
  // 'UNA.MIL': 'Unilever',
  // 'AIR.XMIL': 'AIRBUS',
  // 'NHYO.XSTO': 'Norsk Hydro',
  // 'MOWIO.XSTO': 'Mowi ASA',
  // 'BAP': 'Credicorp',
  // 'PLZL.MISX': 'Polyus',
  // 'ROSN.MISX': 'Rosneft',
  // 'GAZPROM.MISX': 'Gazprom',
  // '2222.XSAU': 'Saudi ARAMCO',
  // '051910.XKRX': 'LG Chem',
  // '005930.XKRX': 'Samsung',
  // 'TEF.XMIL': 'Telefonica',
  // 'ITX.XMIL': 'Inditex',
  // 'GRFS': 'Grifols',
  // 'ERIC_A.XSTO': 'Ericsson',
  // 'NESM.XFRA': 'Nestle',
  // 'UBS': 'UBS',
  // 'TSM': 'TSMC',
  // 'TCM1.XFRA': 'Siam Cement',
  // 'BP.XLON': 'BP',
  // 'LLOY.XLON': 'Lloyds Banking Group',
  // 'AZN.XLON': 'AstraZeneca',
  // 'RIO': 'Rio Tinto',
  // 'GSK': 'GlaxoSmithKline',
  // 'APPL': 'Apple',
  // 'MSFT': 'Microsoft',
  // 'ADBE': 'Adobe',
  // 'CSCO': 'Cisco Systems',
  // 'INTC': 'Intel',
  // 'FB': 'Facebook',
  // 'GOOG': 'Google',
  // 'TSLA': 'Tesla',
  // 'ATVI': 'Activision Blizzard',
  // 'PEP': 'PepsiCo',
  // 'AMZN': 'Amazon',
  // 'IBM': 'IBM',
  // 'T': 'AT&T',
  // 'NKE': 'Nike',
  // 'PG': 'Proctor & Gamble',
  // 'JNJ': 'Johnson & Johnson',
  // 'SHW': 'Sherwin-Williams',
  // 'CAT': 'Caterpillar',
  // 'MMM': '3M',
  // 'UNP': 'Union Pacific',
  // 'GE': 'General Electric',
  // 'UPS': 'UPS',
  // 'DIS': 'Disney',
  // 'JPM': 'JP Morgan',
  // 'V': 'Visa',
  // 'MCD': 'McDonalds',
  // 'KO': 'Coca-Cola',
  // 'GIS': 'General Mills',
  // 'PFE': 'Pfizer',
  // 'CTA-B': 'Dow Chemical',
  // 'HD': 'Home Depot',
  // 'WMT': 'Walmart'
}

const stock_entries = Object.entries(stock_object)

cron.schedule('0 20 * * 1,2,3,4,5', () => {
  for (const [ticker, company] of stock_entries) {
    axios.get('http://api.marketstack.com/v1/tickers/' + `${ticker}` + '/eod/latest', {params})
      .then(response => {
        const apiResponse = response.data;
        if (typeof apiResponse === 'object') {
          const stock = new Stock({
            stockName: `${company}`,
            symbol: `${ticker}`,
            price: apiResponse['close'],
            marketCap: apiResponse['close'] * apiResponse['volume']
          });
          stock.save();
        }
      }).catch(error => {
      console.log(error);
    });
  }
  }, {
  scheduled: true,
  timezone: "America/New_York"
  });


// router.get("", (req, res, next) =>{
//   console.log("It should work");
//   for (const [ticker, company] of stock_entries) {
//     axios.get('http://api.marketstack.com/v1/tickers/' + `${ticker}` + '/eod/latest', {params})
//       .then(response => {
//         const apiResponse = response.data;
//         if (typeof apiResponse === 'object') {
//           const stock = new Stock({
//             stockName: `${company}`,
//             symbol: `${ticker}`,
//             price: apiResponse['close'],
//             marketCap: apiResponse['close'] * apiResponse['volume']
//           });
//           stock.save().then(
//             result => {
//               res.status(201).json({
//                 message: "Stock Created",
//                 result: result
//               });
//             })
//             .catch(err => {
//               res.status(500).json({
//                 error: err
//               });
//             });
//         }
//       });
//   }
// });
//
//
module.exports = router;
