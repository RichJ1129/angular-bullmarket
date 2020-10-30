const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  companyName: {
    type: String
  },
  companySymbol: {
    type: String
  },
  companyCountry: {
    type: String
  },
  companySummary: {
    type: String
  },
  companyCurrency: {
    type: String
  }
});

// export model company with CompanySchema
module.exports = mongoose.model("Company", CompanySchema);
