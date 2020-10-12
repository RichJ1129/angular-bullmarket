const axios = require('axios');

const params = {
  access_key: ""
}

let stock_array = [
  'MELI',
  // 'BBL',
  // 'ABI.XMIL',
  // 'VALE3.BVMF',
  // 'JBSS3.BVMF',
  // 'ABX.XTSE',
  // 'CNR.XTSE',
  // 'TRI.XTSE',
  // 'EC',
  // 'VWS.XCSE',
  // 'NOKIA.XHEL',
  // 'KNEBV.XHEL',
  // 'OR.XMIL',
  // 'LVMH.XMIL',
  // 'TOT.XMIL',
  // 'SANF.XMIL',
  // 'VOW.XFRA',
  // 'SAP.XMIL',
  // 'ADS.XMIL',
  // 'SIE.XMIL',
  // 'BMW.XMIL',
  // 'ALV.XMIL',
  // 'BASF.XMIL',
  // 'BAY.XMIL',
  // 'TCS.XBOM',
  // 'BHARTIARTL.XBOM',
  // 'INFY.XBOM',
  // 'ITC.XBOM',
  // 'RELIANCE.XBOM',
  // 'CAN',
  // 'MDT',
  // 'TEVA',
  // // 6758.XTKS
  // // 7203.XTKS
  // // 5108.XTKS
  // // 9022.XTKS
  // // 8058.XTKS
  // // 7267.XTKS
  // // 7974.XTKS
  // 'SPOT',
  // 'FMXB34.BVMF',
  // 'CX',
  // 'AMX',
  // 'R6C.XFRA',
  // 'UNA.MIL',
  // 'AIR.XMIL',
  // 'NHYO.XSTO',
  // 'MOWIO.XSTO',
  // 'BAP',
  // 'PLZL.MISX',
  // 'ROSN.MISX',
  // 'GAZPROM.MISX',
  // '2222.XSAU',
  // '051910.XKRX',
  // '005930.XKRX',
  // 'TEF.XMIL',
  // 'ITX.XMIL',
  // 'GRFS',
  // 'ERIC_A.XSTO',
  // 'NESM.XFRA',
  // 'UBS',
  // 'TSM',
  // 'TCM1.XFRA',
  // 'BP.XLON',
  // 'LLOY.XLON',
  // 'AZN.XLON',
  // 'RIO',
  // 'GSK',
  // 'APPL',
  // 'MSFT',
  // 'ADBE',
  // 'CSCO',
  // 'INTC',
  // 'FB',
  // 'GOOG',
  // 'TSLA',
  // 'ATVI',
  // 'PEP',
  // 'AMZN',
  // 'IBM',
  // 'T',
  // 'NKE',
  // 'PG',
  // 'JNJ',
  // 'SHW',
  // 'CAT',
  // 'MMM',
  // 'UNP',
  // 'GE',
  // 'UPS',
  // 'DIS',
  // 'JPM',
  // 'V',
  // 'MCD',
  // 'KO',
  // 'GIS',
  // 'PFE',
  // 'CTA-B',
  // 'HD',
  // 'WMT'
]

for (let stock of stock_array) {
  console.log(stock);
  axios.get('http://api.marketstack.com/v1/tickers/' + stock + '/eod/latest', {params})
    .then(response => {
      const apiResponse = response.data;
      if (typeof apiResponse === 'object') {
        console.log('Exchange: ' + apiResponse['exchange'])
        console.log('Volume: ' + apiResponse['volume'])
        console.log('Close: ' + apiResponse['close'])
    }
  }).catch(error => {
    console.log(error);
  });
}


