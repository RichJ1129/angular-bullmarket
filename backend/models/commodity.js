const mongoose = require("mongoose");

const CommoditySchema = mongoose.Schema({
  Ticker: {
    type: String,
    required: true,
    unique: true
  },
  Commodity: {
    type: String,
    required: true,
    unique: true
  },
  ETFPrice: {
    type: String,
    required: true,
    unique: true
  },
  CommodityPrice: {
    type: String,
    required: true,
    unique: true
  },
  CommodityUnit: {
    type: String,
    required: true,
    unique: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Commodity", CommoditySchema);
