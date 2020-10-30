const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companySymbol: {
    type: String,
    required: true
  },
  companyCountry: {
    type: String,
    required: true
  },
  companySummary: {
    type: String
  },
  companyCurrency: {
    type: String,
    required: true
  }
});

// export model company with CompanySchema
module.exports = mongoose.model("company", CompanySchema);
