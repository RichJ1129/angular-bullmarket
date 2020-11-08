const mongoose = require("mongoose");

const CurrencySchema = mongoose.Schema({
  currencyName: {
    type: String,
    required: true
  },
  rates: {
    type: Array,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Array,
    required: true
  }
});

// export model currency with CurrencySchema
module.exports = mongoose.model("Currency", CurrencySchema);
