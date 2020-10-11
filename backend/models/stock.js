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

// export model user with UserSchema
module.exports = mongoose.model("Stock", StockSchema);
