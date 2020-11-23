const mongoose = require("mongoose");

const BondSchema = mongoose.Schema({
  countryName: {
    type: String,
    required: true,
  },
  interestRate: {
    type: Array,
    required: true,
  },
  inflationRate: {
    type: Array,
    required: true,
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Bond", BondSchema);
