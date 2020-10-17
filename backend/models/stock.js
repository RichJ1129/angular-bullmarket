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
    type: Array,
    required: true
  },
  marketCap: {
    type: Array
  },
  closeDate: {
    type: Array,
    required: true
  },
  pERatio: {
    type: Array
  }
});

// export model stock with StockSchema
module.exports = mongoose.model("Stock", StockSchema);
