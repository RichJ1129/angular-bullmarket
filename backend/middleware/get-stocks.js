const express = require("express");
const Stock = require("../models/stock");
const router = express.Router();
const axios = require('axios');


const params = {
  access_key: process.env.STOCK_KEY
}

//Ticker, Name, Outstanding Shares (M), Earning(M)
const stocks = [
  ['MELI','MercadoLibre', 50, -172],
  ['BBL','BHP Group', 2592, 9400],
  ['ABI.XMIL', 'Anheuser-Busch InBev', 1693, 9100],
  ['VALE3.BVMF','Vale', 5284, 179],
  ['JBSS3.BVMF', 'JBS', 2513, 1500],
  ['ABX.XTSE','Barrick Gold', 1778, 4000],
  ['CNR.XTSE', 'Canadian National Railway', 711, 3300],
  ['TRI.XTSE', 'Thomson Reuters', 498, 1600],
  ['EC', 'Ecopetrol', 41116, 4000],
  ['VWS.XCSE', 'Vestas Wind Systems', 198, 788],
  ['NOKIA.XHEL', 'Nokia', 5640, 391],
  ['KNEBV.XHEL', 'Kone', 529, 1000],
  ['OR.XMIL', 'L\'Oreal', 563, 4200],
  ['LVMH.XMIL', 'LVMH Moet Hennessy Louis Vuitton', 505, 8000],
  ['TOT.XMIL', 'Total', 2601, 11300 ],
  ['SANF.XMIL', 'Sanofi', 1251,3300 ],
  ['VOW.XFRA', 'Volkswagen', 501,12000 ],
  ['SAP.XMIL', 'SAP', 1228, 4700 ],
  ['ADS.XMIL', 'Adidas', 195, 1500 ],
  ['SIE.XMIL', 'Siemens', 818, 5900 ],
  ['BMW.XMIL', 'BMW Group', 659, 5500 ],
  ['ALV.XMIL', 'Allianz', 432, 8900 ],
  ['BASF.XMIL', 'BASF', 918, 8800 ],
  ['BAY.XMIL', 'Bayer', 982, 4800 ],
  ['TCS.XBOM', 'Tata Consultancy Services', 3752, 4600 ],
  // ['BHARTIARTL.XBOM', 'Bharti Airtel', 5455, -3800 ],
  ['INFY.XBOM', 'Infosys', 3519, 2300 ],
  ['ITC.XBOM', 'ITC', 12295, 1600 ],
  ['RELIANCE.XBOM', 'Reliance Industries', 6339, 6200],
  ['CAN', 'Accenture', 663, 33500],
  ['MDT', 'Medtronic', 1344, 5400],
  ['TEVA', 'Teva Pharmaceutical', 1100, -1000],
  // 6758.XTKS
  // 7203.XTKS
  // 5108.XTKS
  // 9022.XTKS
  // 8058.XTKS
  // 7267.XTKS
  // 7974.XTKS
  ['SPOT', 'Spotify Technology', 187, -200],
  // 'FMXB34.BVMF': ['Femsa'],
  ['CX', 'Cemex', 1511, 88],
  ['AMX', 'America Movil', 1227, 3500],
  // 'R6C.XFRA': ['Royal Dutch Shell'],
  // ['UNA.MIL', 'Unilever', 1460, 6300],
  // 'AIR.XMIL': ['AIRBUS'],
  // 'NHYO.XSTO': ['Norsk Hydro'],
  // ['MOWIO.XSTO', 'Mowi ASA', 517, 535],
  ['BAP', 'Credicorp', 79, 1300],
  // ['PLZL.MISX', 'Polyus', 136, 1900],
  // ['ROSN.MISX', 'Rosneft', 1006, 10900],
  // ['GAZPROM.MISX', 'Gazprom', 2367, 22700 ],
  ['2222.XSAU', 'Saudi ARAMCO', 200000, 88000],
  ['051910.XKRX', 'LG Chem', 71, 131],
  ['005930.XKRX', 'Samsung', 5970, 18400],
  ['TEF.XMIL', 'Telefonica', 5330, 1000],
  // 'ITX.XMIL': ['Inditex'],
  ['GRFS', 'Grifols', 261, 700],
  ['ERIC_A.XSTO', 'Ericsson', 3306, 215],
  ['NESM.XFRA', 'Nestle', 2880, 12700],
  ['UBS', 'UBS', 3691, 4800],
  ['TSM', 'TSMC', 5190, 13000],
  ['TCM1.XFRA', 'Siam Cement', 124, 882],
  ['BP.XLON', 'BP', 20270, -3300],
  ['LLOY.XLON', 'Lloyds Banking Group', 70800, 3100],
  ['AZN.XLON', 'AstraZeneca', 1310, 1500],
  ['RIO', 'Rio Tinto', 1642, 8000],
  ['GSK', 'GlaxoSmithKline', 2508, 6800],
  ['AAPL', 'Apple', 21007, 57000],
  ['MSFT', 'Microsoft', 7570, 46300],
  ['ADBE', 'Adobe', 492, 3200],
  ['CSCO', 'Cisco Systems', 4453, 11100],
  ['INTC', 'Intel', 4473, 22700],
  ['FB', 'Facebook', 2956, 21000],
  ['GOOG', 'Google', 680, 34500],
  ['TSLA', 'Tesla', 932, 376],
  ['ATVI', 'Activision Blizzard', 766, 1500],
  ['PEP', 'PepsiCo', 1390, 7200],
  ['AMZN', 'Amazon', 501, 10600],
  ['IBM', 'IBM', 893, 9000],
  ['T', 'AT&T', 7130, 14400],
  ['NKE', 'Nike', 1659, 4300],
  ['PG', 'Proctor & Gamble', 2657, 5000],
  ['JNJ', 'Johnson & Johnson', 2630, 17200],
  ['SHW', 'Sherwin-Williams', 92, 1600],
  ['CAT', 'Caterpillar', 542, 4400],
  ['MMM', '3M', 585, 5000],
  ['UNP', 'Union Pacific', 679, 6000],
  ['GE', 'General Electric', 8750, 6300],
  ['UPS', 'UPS', 869, 4300],
  ['DIS', 'Disney', 1809, 10400],
  ['JPM', 'JP Morgan', 3050, 30000],
  ['V', 'Visa', 2470, 11900],
  ['MCD', 'McDonalds', 765, 20800],
  ['KO', 'Coca-Cola', 4300, 10000],
  ['GIS', 'General Mills', 620, 2100],
  ['PFE', 'Pfizer', 5675, 15800, 15800],
  ['DOW', 'Dow Chemical', 741, -1700],
  ['HD', 'Home Depot', 1097, 11200],
  ['WMT', 'Walmart', 2830, 14900]
]


function apiStockCall (curr_stock) {
  axios.get('http://api.marketstack.com/v1/tickers/' + curr_stock[0] + '/eod/latest', {params})
    .then(response => {
      const apiResponse = response.data;
      if (typeof apiResponse === 'object') {
        const stock = new Stock({
          stockName: curr_stock[1],
          symbol: curr_stock[0],
          price: apiResponse['close'],
          marketCap: apiResponse['close'] * curr_stock[2],
          closeDate: new Date(Date.now()),
          pERatio: apiResponse['close']/(curr_stock[3]/curr_stock[2])
        });
        Stock.count({stockName: curr_stock[1]}, function (err, count) {
          if (count > 0){
            Stock.findOneAndUpdate(
              {stockName: curr_stock[1]},
              {$push:{price: stock['price'], marketCap: stock['marketCap'], closeDate: stock['closeDate'], pERatio: stock['pERatio']}},
              function (error, success) {
                if(error) {
                  console.log(error);
                } else {
                  console.log(curr_stock[0]);
                }
              }
            );
          } else {
            stock.save();
          }
        })
      }
    }).catch(error => {
    console.log(error);
  });
}

const interval = 1000;

module.exports = {
  getStocks: function () {
    for (let i = 0; i <= stocks.length - 1; i++) {
      setTimeout(function (i) {apiStockCall(stocks[i])}, interval * i, i);
    }
  }
};



