const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema({
  countryName: {
    type: String,
    required: true
  },
  capitalCity: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  urbanRent: {
    type: Number,
    required: false
  },
  urbanPE: {
    type: Number,
    required: false
  },
  ruralRent: {
    type: Number,
    required: false
  },
  ruralPE: {
    type: Number,
    required: false
  },
  interestRate: {
    type: Number,
    required: false
  },
  debtGDP: {
    type: Number,
    required: false
  },
  inflation: {
    type: Number,
    required: false
  }
});


// export model user with UserSchema
module.exports = mongoose.model("Country", CountrySchema);
