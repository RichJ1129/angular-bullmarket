const mongoose = require("mongoose");

const CommoditySchema = mongoose.Schema({
  commodityName: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  etfPrice: {
    type: Array,
    required: true,
  },
  commodityUnit: {
    type: String,
    required: true,
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Commodity", CommoditySchema);
