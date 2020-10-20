const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  symbol: {
    type: String,
    required: false
  },
  purchasePrice: {
    type: String,
    required: false
  },
  shares: {
    type: String,
    required: false
  }
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);
