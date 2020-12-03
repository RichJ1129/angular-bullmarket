const mongoose = require("mongoose");

const InvestmentSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  symbol: {
    type: String,
    required: false
  },
  transactionPrice: {
    type: String,
    required: false
  },
  shares: {
    type: String,
    required: false
  },
  transactionType: {
    type: String,
    required: false
  },
  assetType: {
    type: String,
    required: false
  },
  transactionDate: {
    type: String,
    required: false
  },
  lastPaymentDate:{
    type: String,
    required: false
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Investment", InvestmentSchema);
