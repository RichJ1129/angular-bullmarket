const mongoose = require("mongoose");

const StockSchema = mongoose.Schema({
  stockName: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number
  }

});

// export model stock with StockSchema
module.exports = mongoose.model("Stock", StockSchema);
