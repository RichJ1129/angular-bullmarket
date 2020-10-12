const axios = require('axios');

const params = {
  access_key: process.env.STOCK_KEY
}

axios.get('https://api.marketstack.com/v1/tickers/aapl/eod', {params})
  .then(response => {
    const apiResponse = response.data;
    if (Array.isArray(apiResponse['data'])) {
      apiResponse['data'].forEach(stockData => {
        console.log(`Ticker ${stockData['symbol']}`,
          `has a day high of ${stockData['high']},
                  `on ${stockData['date']}`);
        });
    }
  }).catch(error => {
    console.log(error);
  });
