const express = require("express");
const Currency = require("../models/currency");
const router = express.Router();
const axios = require('axios');


const currency_pairs = [
  ['USDAFN', 'Afghan Afghani'],
  ['USDAMD', 'Armenian Dram'],
  ['USDAOA', 'Angola Kwanza'],
  ['USDARS', 'Argentine Peso'],
  ['USDAUD', 'Australian Dollar'],
  ['USDAZN', 'Azerbaijani Manat'],
  ['USDBDT', 'Bangladeshi Taka'],
  ['USDBOB', 'Bolivian Boliviano', 'Bs'],
  ['USDBRL', 'Brazilian Real', 'R$'],
  ['USDBWP', 'Botswana Pula', 'P'],
  ['USDBZD', 'Belize Dollar', '$'],
  ['USDCAD', 'Canadian Dollar', 'C$'],
  ['USDCHF', 'Swiss Frac', 'CHF'],
  ['USDCLP', 'Chilean Peso', '$'],
  ['USDCNY', 'Chinese Renminbi', '¥'],
  ['USDCOP', 'Colombian Peso', '$'],
  ['USDDKK', 'Danish Krone', 'Kr'],
  ['USDDZD', 'Algerian Dinar', 'دج'],
  ['USDEGP', 'Egyptian Pound', 'ج.م'],
  ['USDETB', 'Ethiopian Birr', 'ብር'],
  ['USDEUR', 'Euro', '€'],
  ['USDGBP', 'British Pound', '£'],
  ['USDGHS', 'Ghanaian Cedi', 'gh¢'],
  ['USDHNL', 'Honduran Lempira', 'L'],
  ['USDIDR', 'Indonesian Rupiah', 'Rp'],
  ['USDILS', 'Israeli New Shekel', '₪'],
  ['USDINR', 'Indian Rupee', '₹'],
  ['USDIQD', 'Iraqi Dinar', 'ع.د'],
  ['USDJPY', 'Japanese Yen', '¥'],
  ['USDKES', 'Kenyan Shilling', 'ع.د'],
  ['USDKHR', 'Cambodian Riel', '៛'],
  ['USDKRW', 'South Korean Won', '₩'],
  ['USDKZT', 'Kazakhstani Tenge', '₸'],
  ['USDMNT', 'Mongolian Tögrög', '₮'],
  ['USDMXN', 'Mexican Peso', '$'],
  ['USDMYR', 'Malaysian Ringgit', 'RM'],
  ['USDNGN', 'Nigerian Naira', '₦'],
  ['USDNOK', 'Norwegian Krone', 'kr'],
  ['USDPEN', 'Peruvian Sol', 'S/'],
  ['USDPHP', 'Philippine Peso', '₱'],
  ['USDPKR', 'Pakistani Rupee', 'Rs'],
  ['USDPLN', 'Polish Zloty', 'zł'],
  ['USDRUB', 'Russian Ruble', '₽'],
  ['USDSAR', 'Saudi Riyal', 'ر.س '],
  ['USDSEK', 'Swedish Krona', 'kr'],
  ['USDSGD', 'Singapore Dollar', '$'],
  ['USDTHB', 'Thai Baht', '฿'],
  ['USDTRY', 'Turkish Lira', '₺'],
  ['USDUAH', 'Ukrainian Hryvnia', '₴'],
  ['USDUGX', 'Ugandan Shilling', 'Ush'],
  ['USDVEF', 'Venezuelan Bolivar', 'Bs'],
  ['USDVND', 'Vietnamese Dong', '₫'],
  ['USDZAR', 'South African Rand', 'R'],
  ['USDXAG', 'Silver'],
  ['USDXAU', 'Gold']
]

let pair_string_url = '';

for (let i = 0; i <= currency_pairs.length - 1; i++) {
  pair_string_url += currency_pairs[i][0];
  if (i < currency_pairs.length - 1) {
    pair_string_url += ',';
  }
}

function apiCurrencyCall() {
  axios.get('https://www.freeforexapi.com/api/live?pairs=' + pair_string_url)
    .then(response => {
      const apiResponse = response['data']['rates'];
      for (let i = 0; i <= currency_pairs.length - 1; i++) {
        if (currency_pairs[i][0] in apiResponse) {
          let currency = new Currency({
            currencyName: currency_pairs[i][1],
            ticker: currency_pairs[i][0],
            rates: apiResponse[currency_pairs[i][0]]['rate'],
            timeStamp: new Date(Date.now())
          })
          Currency.count({currencyName: currency_pairs[i][1]}, function (err, count) {
            if (count > 0) {
              Currency.findOneAndUpdate(
                {currencyName: currency_pairs[i][1]},
                {$push: {rates: currency['rates'], timeStamp: currency['timeStamp']}},
                function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(currency['rates']);
                  }
                }
              );
            } else {
              currency.save();
            }
          })
        }
      }
    }).catch(error => {
    console.log(error);
  });
}

module.exports = {
  getCurrency: function () {
    apiCurrencyCall();
  }
};
