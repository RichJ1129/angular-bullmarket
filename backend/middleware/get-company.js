const express = require("express");
const Company = require("../models/company");
const router = express.Router();
const wiki = require('wikijs').default;



//ticker, company name, headquarters country, currency, Wiki Search Term(Optional)
const companies = [
  ['MELI','MercadoLibre', 'Argentina', 'USD'],
  ['BBL','BHP Group', 'Australia', 'USD'],
  ['ABI.XMIL', 'Anheuser-Busch InBev', 'Belgium', 'Euros'],
  ['VALE3.BVMF','Vale', 'Brazil', 'Brazilian real', 'Vale (company)'],
  ['JBSS3.BVMF', 'JBS', 'Brazil', 'Brazilian real', 'JBS S.A.'],
  ['ABX.XTSE','Barrick Gold', 'Canada', 'Canadian Dollars'],
  ['CNR.XTSE', 'Canadian National Railway', 'Canada', 'Canadian Dollars'],
  ['TRI.XTSE', 'Thomson Reuters', 'Canada', 'Canadian Dollars'],
  ['EC', 'Ecopetrol', 'Colombia', 'USD'],
  ['VWS.XCSE', 'Vestas Wind Systems', 'Denmark', 'Danish Krone'],
  ['NOKIA.XHEL', 'Nokia', 'Finland', 'Euros'],
  ['KNEBV.XHEL', 'Kone', 'Finland', 'Euros'],
  ['OR.XMIL', 'L\'Oreal', 'France', 'Euros'],
  ['LVMH.XMIL', 'LVMH Moet Hennessy Louis Vuitton', 'France', 'Euros', 'LVMH'],
  ['TOT.XMIL', 'Total', 'France', 'Euros', 'Total SE' ],
  ['SANF.XMIL', 'Sanofi', 'France', 'Euros' ],
  ['VOW.XFRA', 'Volkswagen', 'Germany', 'Euros' ],
  ['SAP.XMIL', 'SAP', 'Germany', 'Euros' ],
  ['ADS.XMIL', 'Adidas', 'Germany', 'Euros' ],
  ['SIE.XMIL', 'Siemens', 'Germany', 'Euros' ],
  ['BMW.XMIL', 'BMW Group', 'Germany', 'Euros' ],
  ['ALV.XMIL', 'Allianz', 'Germany', 'Euros' ],
  ['BASF.XMIL', 'BASF', 'Germany', 'Euros' ],
  ['BAY.XMIL', 'Bayer', 'Germany', 'Euros' ],
  ['TCS.XBOM', 'Tata Consultancy Services', 'India', 'Indian Rupee' ],
  ['INFY.XBOM', 'Infosys', 'India', 'Indian Rupee' ],
  ['ITC.XBOM', 'ITC', 'India', 'Indian Rupee', 'ITC Limited'],
  ['RELIANCE.XBOM', 'Reliance Industries', 'India', 'Indian Rupee'],
  ['ACN', 'Accenture', 'Ireland', 'USD'],
  ['MDT', 'Medtronic', 'Ireland', 'USD'],
  ['TEVA', 'Teva Pharmaceutical', 'Israel', 'USD'],
  ['SPOT', 'Spotify Technology', 'Sweden', 'USD', 'Spotify'],
  ['CX', 'Cemex', 'Mexico', 'USD'],
  ['AMX', 'America Movil', 'Mexico', 'USD'],
  ['BAP', 'Credicorp', 'Peru', 'USD'],
  ['2222.XSAU', 'Saudi ARAMCO', 'Saudi Arabia', 'Saudi Riyal', 'Saudi Aramco'],
  ['051910.XKRX', 'LG Chem', 'South Korea', 'South Korean won'],
  ['005930.XKRX', 'Samsung', 'South Korea', 'South Korean won'],
  ['TEF.XMIL', 'Telefonica', 'Spain', 'Euros'],
  ['GRFS', 'Grifols', 'Spain', 'USD'],
  ['ERIC_A.XSTO', 'Ericsson', 'Sweden', 'Swedish Krona'],
  ['NESM.XFRA', 'Nestle', 'Switzerland', 'Euros'],
  ['UBS', 'UBS', 'Switzerland', 'USD'],
  ['TSM', 'TSMC', 'Taiwan', 'USD'],
  ['TCM1.XFRA', 'Siam Cement', 'Thailand', 'Euros'],
  ['BP.XLON', 'BP', 'United Kingdom', 'British pound sterling'],
  ['LLOY.XLON', 'Lloyds Banking Group', 'United Kingdom', 'British pound sterling'],
  ['AZN.XLON', 'AstraZeneca', 'United Kingdom', 'British pound sterling'],
  ['RIO', 'Rio Tinto', 'United Kingdom', 'USD'],
  ['GSK', 'GlaxoSmithKline', 'United Kingdom', 'USD'],
  ['AAPL', 'Apple', 'United States', 'USD', 'Apple Inc.'],
  ['MSFT', 'Microsoft', 'United States', 'USD'],
  ['ADBE', 'Adobe', 'United States', 'USD', 'Adobe Inc.'],
  ['CSCO', 'Cisco Systems', 'United States', 'USD'],
  ['INTC', 'Intel', 'United States', 'USD'],
  ['FB', 'Facebook', 'United States', 'USD'],
  ['GOOG', 'Google', 'United States', 'USD'],
  ['TSLA', 'Tesla', 'United States', 'USD', 'Tesla, Inc.'],
  ['ATVI', 'Activision Blizzard','United States', 'USD'],
  ['PEP', 'PepsiCo', 'United States', 'USD'],
  ['AMZN', 'Amazon', 'United States', 'USD', 'Amazon (company)'],
  ['IBM', 'IBM','United States', 'USD'],
  ['T', 'AT&T', 'United States', 'USD'],
  ['NKE', 'Nike','United States', 'USD', 'Nike, Inc.'],
  ['PG', 'Proctor & Gamble', 'United States', 'USD'],
  ['JNJ', 'Johnson & Johnson', 'United States', 'USD'],
  ['SHW', 'Sherwin-Williams', 'United States', 'USD'],
  ['CAT', 'Caterpillar', 'United States', 'USD', 'Caterpillar Inc.'],
  ['MMM', '3M', 'United States', 'USD'],
  ['UNP', 'Union Pacific', 'United States', 'USD'],
  ['GE', 'General Electric', 'United States', 'USD'],
  ['UPS', 'UPS', 'United States', 'USD', 'United Parcel Service'],
  ['DIS', 'Disney', 'United States', 'USD'],
  ['JPM', 'JP Morgan','United States', 'USD'],
  ['V', 'Visa', 'United States', 'USD', 'Visa Inc.'],
  ['MCD', 'McDonalds', 'United States', 'USD'],
  ['KO', 'Coca-Cola', 'United States', 'USD'],
  ['GIS', 'General Mills', 'United States', 'USD'],
  ['PFE', 'Pfizer', 'United States', 'USD'],
  ['DOW', 'Dow Chemical', 'United States', 'USD'],
  ['HD', 'Home Depot', 'United States', 'USD'],
  ['WMT', 'Walmart', 'United States', 'USD']
]

function apiCompanyCall(curr_company) {
  let num = 1;
  if (curr_company.length > 4) {
    num = 4;
  }
  wiki().page(curr_company[num]).then(page => page.summary())
    .then(response => {
      console.log(response)
      let company = new Company({
        companyName: curr_company[1],
        companySymbol: curr_company[0],
        companyCountry: curr_company[2],
        companySummary: response,
        companyCurrency: curr_company[3]
      });
      Company.count({companyName: curr_company[1]}, function (err, count) {
        if (count > 0){
          Company.findOneAndUpdate(
            {companyName: curr_company[1]},
            {companySummary: company['companySummary']},
            function (error, success) {
              if(error) {
                console.log(error);
              } else {
                console.log(curr_company[0]);
              }
            }
          );
        } else {
          company.save();
        }
      })
    }).catch(error => {
  console.log(error);
});
}

const interval = 10000;

module.exports = {
  getCompanies: function () {
    for (let i = 0; i <= companies.length - 1; i++) {
      setTimeout(function (i) {apiCompanyCall(companies[i])}, interval * i, i);
    }
  }
};
