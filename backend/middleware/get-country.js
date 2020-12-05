const express = require("express");
const Country = require("../models/country");
const router = express.Router();
const axios = require('axios');
const wiki = require('wikijs').default;


// Country Name, Capital City, Population, Urban Rent, Urban PE, Rural Rent, Rural PE, Interest Rate, Debt GDP, Inflation Rate, Bond Symbol, Urban RE Symbol, Rural RE Symbol
const country = [
    ['Afghanistan','Kabul','32000000','133.11','27.15','71.34','23.16','15.00','7','6.30','AFGBOND','AFGUR','AFGRR'],
    ['Albania','Tirana','3000000','305.74','23.84','186.20','19.25','0.50','64','1.30','ALBBOND','ALBUR','ALBRR'],
    ['Algeria','Algiers','44000000','182.31','32.01','118.34','25.36', '3.75','46', '2.20','DZABOND','DZAUR','DZARR'],
    ['Angola','Luanda','31000000','193.29','0','96.64','0', '15.50','111', '23.40','AGOBOND','AGOUR','AGORR'],
    ['Argentina','Buenos Aires','45000000','223.75','52.97','170.12','51.31', '36.90','89', '39.20','ARGBOND','ARGUR','ARGRR'],
    ['Armenia','Yerevan','3000000','362.48','19.16','200.64','19.73', '4.25','46', '1.80','ARMBOND','ARMUR','ARMRR'],
    ['Australia','Canberra','25000000','1254.08','22.97','922.26','22.23', '0.86','45', '-0.30','AUSBOND','AUSUR','AUSRR'],
    ['Austria','Vienna','9000000','874.34','31.51','678.26','28.18', '-0.35','70', '1.40','AUTBOND','AUTUR','AUTRR'],
    ['Azerbaijan','Baku','10000000','311.18','19.46','175.56','17.66', '6.50','48', '2.90','AZEBOND','AZEUR','AZERR'],
    // ['Bahrain','Manama','1500000','956.61','13.44','657.25','12.58', '3.16','93', '-3.6','BHRBOND','BHRUR','BHRRR'],
    ['Bangladesh','Dhaka','161000000','130.66','31.94','79.25','27.84', '7.55','28', '5.70','BGDBOND','BGDUR','BGDRR'],
    ['Belarus','Minsk','9000000','327.06','21.19','214.10','22.8', '7.75','27', '5.60','BLRBOND','BLRUR','BLRRR'],
    ['Belgium','Brussels','11000000','867.5','20.47','713.14','19.98', '-0.28','99', '0.90','BELBOND','BELUR','BELRR'],
    ['Benin','Porto-Novo','11000000','57.86','0','53.41','0', '4.00','22', '3.90','BENBOND','BENUR','BENRR'],
    ['Bolivia','La Paz','11000000','350.82','14.44','246.6','13.75', '3.34','58', '1.40','BOLBOND','BOLUR','BOLRR'],
    ['Bosnia and Herz.','Sarajevo','3000000','229.50','31.06','157.53','31.01', '3.05','25', '1.30','BIHBOND','BIHUR','BIHRR', 'Bosnia and Herzegovina'],
    ['Botswana','Gaborone','2000000','281.44','0','232.90','0', '3.63','23', '1.40','BWABOND','BWAUR','BWARR'],
    ['Brazil','Brasilia','210000000','237.19','23.9','166.26','23.3', '7.20','76', '2.40','BRABOND','BRAUR','BRARR'],
    ['Bulgaria','Sofia','7000000','327.76','20.17','245.55','17.46', '0.28','21', '1.28','BGRBOND','BGRUR','BGRRR'],
    ['Burkina Faso','Ouagadougou','22000000','278.93','0','111.27','0', '4.00','23', '1.10','BFABOND','BFAUR','BFARR'],
    ['Burundi','Gitega','12000000','476.69','0','155.72','0', '6.00','14', '7.70','BDIBOND','BDIUR','BDIRR'],
    ['Cambodia','Phnom Penh','15000000','418.30','21.62','250','17.37', '1.50','29', '3.20','KHMBOND','KHMUR','KHMRR'],
    ['Cameroon','Yaounde','27000000','173.29','0','97.92','0', '3.25','34', '2.40','CMRBOND','CMRUR','CMRRR'],
    ['Canada','Ottawa','38000000','1017.25','21.96','826.16','18.35', '0.54','90', '0.10','CANBOND','CANUR','CANRR'],
    ['Chad','NDjamena','14000000','0','0','74.18','0', '3.25','47', '3.50','TCDBOND','TCDUR','TCDRR'],
    ['Chile','Santiago','18000000','428.77','25.71','354.75','26.04', '2.67','28', '2.40','CHLBOND','CHLUR','CHLRR'],
    ['China','Beijing','1400000000','523.04','61.18','290.85','56.69', '3.11','51', '2.40','CHNBOND','CHNUR','CHNRR'],
    ['Colombia','Bogota','50000000','298.03','20.86','220.96','21.65', '5.15','48', '1.90','COLBOND','COLUR','COLRR'],
    ['Dem. Rep. Congo','Kinshasa','90000000','0','0','0','0', '18.50','99', '28.70','COGBOND','COGUR','COGRR', 'Democratic Republic of the Congo'],
    ['Costa Rica','San Jose','5000000','490.28','17.31','356.52','18.06', '0.75','77', '0.10','CRIBOND','CRIUR','CRIRR'],
    ['Croatia','Zagreb','4000000','484.10','29.14','368.81','27.27', '0.83','73', '-0.20','HRVBOND','HRVUR','HRVRR'],
    ['Cyprus','Nicosia','1200000','667.73','15.84','543.45','15.2', '0.59','96', '-1.20','CYPBOND','CYPUR','CYPRR'],
    ['Cuba','Havana','11000000','177.50','0','57.5','0', '2.25','18', '5.70','CUBBOND','CUBUR','CUBRR'],
    ['Czech Republic','Prague','11000000','654.46','31.9','509.15','29.2', '0.83','31', '3.30','CZEBOND','CZEUR','CZERR'],
    ['Denmark','Copenhagen','6000000','1119.97','24.1','799.52','23.1', '-0.42','33', '0.50','DNKBOND','DNKUR','DNKRR'],
    ['Dominican Republic','Santo Domingo','11000000','364.46','13.23','200.29','13.33', '3.00','51', '4.80','DOMBOND','DOMUR','DOMRR'],
    ['Ecuador','Quito','17000000','393.94','17.11','282.88','16.79', '9.12','49', '0.80','ECUBOND','ECUUR','ECURR'],
    ['Egypt','Cairo','100000000','192.56','18.29','117','15.55', '15.18','90', '-3.40','EGYBOND','EGYUR','EGYRR'],
    ['El Salvador','San Salvador','6000000','380','0','306.25','0', '4.18','73', '-0.30','SLVBOND','SLVUR','SLVRR'],
    ['Eritrea','Asmara','6000000','100','0','66.68','0', '0','20', '-27.60','ERIBOND','ERIUR','ERIRR'],
    ['Estonia','Tallinn','1300000','545.04','24.95','376.21','24.57', '0.00','8', '-0.90','ESTBOND','ESTUR','ESTRR'],
    ['Ethiopia','Addis Ababa','109000000','352.29','0','162.17','0', '7.00','57', '20.00','ETHBOND','ETHUR','ETHRR'],
    ['Finland','Helsinki','6000000','905.98','32.04','692.37','24.5', '-0.35','59', '0.20','FINBOND','FINUR','FINRR'],
    ['France','Paris','67000000','813.34','42.33','609.71','', '-0.25','98', '0.10','FRABOND','FRAUR','FRARR'],
    ['Georgia','Tbilisi','4000000','320.14','14.04','206.53','11.94', '8.00','43', '3.80','GEOBOND','GEOUR','GEORR', 'Georgia (country)'],
    ['Germany','Berlin','83000000','887.78','31.04','656.60','28.13', '-0.50','60', '0.20','DEUBOND','DEUUR','DEURR'],
    ['Ghana','Accra','31000000','674.78','0','146.19','0', '14.50','59', '10.50','GHABOND','GHAUR','GHARR'],
    ['Greece','Athens','10000000','399.87','23.4','329.39','24.17', '1.01','177', '1.90','GRCBOND','GRCUR','GRCRR'],
    ['Guatemala','Guatemala City','17000000','548.48','14.1','349.83','13.7', '1.75','28', '2.90','GTMBOND','GTMUR','GTMRR'],
    ['Guinea','Conakry','12000000','566.67','0','233.33','0', '11.50','18', '11.30','GINBOND','GINUR','GINRR'],
    ['Honduras','Tegucigalpa','10000000','339.41','12.93','260.14','16.23', '3.75','44', '3.20','HNDBOND','HNDUR','HNDRR'],
    ['Hungary','Budapest','10000000','418.91','26.03','320.99','23.38', '2.42','66', '3.90','HUNBOND','HUNUR','HUNRR'],
    ['Iceland','Reykjavik','360000','1337.49','15.73','1087.67','14.4', '2.66','37', '3.50','ISLBOND','ISLUR','ISLRR'],
    ['India','New Delhi','1350000000','170.14','32.11','105.69','27.51', '5.99','70', '6.70','INDBOND','INDUR','INDRR'],
    ['Indonesia','Jakarta','268000000','288.95','22.73','181.96','20.2', '6.99','30', '1.40','IDNBOND','IDNUR','IDNRR'],
    ['Iran','Tehran','83000000','535.95','22.35','336.83','19.27', '18.00','44', '34.40','IRNBOND','IRNUR','IRNRR'],
    ['Iraq','Baghdad','38000000','377.23','17.2','243.56','13.74', '4.00','48', '0.70','IRQBOND','IRQUR','IRQRR'],
    ['Ireland','Dublin','7000000','1475.87','16.06','1196.43','14.01', '-0.17','59', '1.00','IRLBOND','IRLUR','IRLRR'],
    ['Israel','Jerusalem','9000000','1062.84','34.28','816.80','33.95', '0.66','60', '0.80','ISRBOND','ISRUR','ISRRR'],
    ['Italy','Rome','60000000','726.42','26.32','544.91','20.82', '0.85','135', '0.50','ITABOND','ITAUR','ITARR'],
    ['Jamaica','Kingston','3000000','436.11','0','252.56','0', '0.50','103', '5.60','JAMBOND','JAMUR','JAMRR'],
    ['Japan','Tokyo','126000000','827.36','45.15','548.55','40.72', '0.01','237', '-0.20','JPNBOND','JPNUR','JPNRR'],
    ['Jordan','Amman','10000000','344.71','16.49','244.08','14', '4.68','92', '-0.60','JORBOND','JORUR','JORRR'],
    ['Kazakhstan','Nur-Sultan','19000000','298.42','14.21','195.44','14.96', '9.00','22', '7.00','KAZBOND','KAZUR','KAZRR'],
    ['Kenya','Nairobi','48000000','283.03','64.9','140.08','28.31', '12.02','57', '4.20','KENBOND','KENUR','KENRR'],
    ['Kuwait','Kuwait City','4000000','889.39','31.88','701.84','19.26', '1.50','15', '1.90','KWTBOND','KWTUR','KWTRR'],
    ['Kyrgyzstan','Bishkek','6500000','238.28','14.56','162.13','14.84', '5.00','54', '5.00','KGZBOND','KGZUR','KGZRR'],
    ['Lebanon','Beirut','7000000','803.92','18.71','405.54','17.87', '4.53','151', '120.00','LBNBOND','LBNUR','LBNRR'],
    ['Libya','Tripoli','7000000','494.32','0','302.08','0', '3.00','17', '1.30','LBYBOND','LBYUR','LBYRR'],
    ['Lithuania','Vilnius','3000000','521.52','25.51','348.13','22.85', '0.14','36', '1.30','LTUBOND','LTUUR','LTURR'],
    ['Madagascar','Antananarivo','26000000','247.18','0','88.46','0', '9.50','30', '4.00','MDGBOND','MDGUR','MDGRR'],
    ['Malawi','Lilongwe','19000000','461.24','0','325.96','0', '13.50','62', '7.60','MWIBOND','MWIUR','MWIRR'],
    ['Malaysia','Kuala Lumpur','33000000','365.41','27.67','227.29','25.16', '2.76','52', '1.40','MYSBOND','MYSUR','MYSRR'],
    ['Mexico','Mexico City','129000000','348.28','15.82','215.06','15.32', '5.84','46', '4.10','MEXBOND','MEXUR','MEXRR'],
    ['Mongolia','Ulanbaatar','3000000','353.51','12.82','224.93','13.29', '9.00','55', '2.10','MNGBOND','MNGUR','MNGRR'],
    ['Morocco','Rabat','36000000','329.55','21.32','181.92','21.77', '2.35','66', '0.90','MARBOND','MARUR','MARRR'],
    ['Namibia','Windhoek','3000000','365.64','0','269.28','0', '10.95','45', '2.40','NAMBOND','NAMUR','NAMRR'],
    ['Nepal','Kathmandu','28000000','134.17','36.3','96.95','28.46', '5.00','30', '4.80','NPLBOND','NPLUR','NPLRR'],
    ['Netherlands','Amsterdam','17000000','1299.42','18.54','1032.88','17.72', '-0.39','49', '0.70','NLDBOND','NLDUR','NLDRR'],
    ['New Zealand','Wellington','5000000','1086.22','23.1','857.76','22.16', '0.48','19', '1.50','NZLBOND','NZLUR','NZLRR'],
    ['Nicaragua','Managua','6000000','246.14','0','185.91','0', '10.00','53', '3.60','NICBOND','NICUR','NICRR'],
    ['Niger','Niamey','22000000','373.72','0','303.64','0', '4.00','34', '2.60','NERBOND','NERUR','NERRR'],
    ['Nigeria','Abuja','206000000','709.20','0','506.56','0', '9.00','18', '13.20','NGABOND','NGAUR','NGARR'],
    ['Norway','Oslo','5000000','1154.57','27.7','860.78','24.73', '0.65','41', '1.70','NORBOND','NORUR','NORRR'],
    ['Oman','Muscat','5000000','564.52','18.13','385.67','22.34', '0.50','48', '1.35','OMNBOND','OMNUR','OMNRR'],
    ['Pakistan','Islamabad','212000000','133.58','20.48','83.13','19.78', '9.64','85', '9.00','PAKBOND','PAKUR','PAKRR'],
    ['Panama','Panama City','4000000','784.15','12.11','525.68','12.84', '1.36','40', '-2.40','PANBOND','PANUR','PANRR'],
    ['Paraguay','Asuncion','7000000','274.37','0','185.42','0', '0.75','23', '1.60','PRYBOND','PRYUR','PRYRR'],
    ['Peru','Lima','33000000','413.61','18.24','249.66','18.51', '4.25','28', '1.80','PERBOND','PERUR','PERRR'],
    ['Philippines','City of Manila','100000000','352.04','30.77','194.84','29.28', '3.09','42', '2.40','PHLBOND','PHLUR','PHLRR'],
    ['Poland','Warsaw','38000000','568.34','23.74','428.42','20.56', '1.33','46', '3.20','POLBOND','POLUR','POLRR'],
    ['Portugal','Lisbon','10000000','739.06','19.88','541.12','16.67', '0.25','118', '-0.10','PRTBOND','PRTUR','PRTRR'],
    ['Romania','Bucharest','19000000','357.77','22.47','255.46','21.85', '3.50','35', '2.70','ROUBOND','ROUUR','ROURR'],
    ['Russia','Moscow','147000000','296.69','17.5','207.54','16.95', '6.27','12', '3.60','RUSBOND','RUSUR','RUSRR'],
    ['Rwanda','Kigali','12000000','435.51','0','234.18','0', '4.50','41', '10.90','RWABOND','RWAUR','RWARR'],
    ['Saudi Arabia','Riyadh','34000000','384.35','13.06','277.32','11.78', '1.00','23', '6.20','SAUBOND','SAUUR','SAURR'],
    ['Senegal','Dakar','16000000','603.90','0','249.26','0', '4.00','48', '3.00','SENBOND','SENUR','SENRR'],
    ['Serbia','Belgrade','7000000','309.37','31.9','209.52','29.68', '3.03','52', '1.90','SRBBOND','SRBUR','SRBRR'],
    ['Sierra Leone','Freetown','7000000','633.64','0','152.07','0', '15.00','63', '14.36','SLEBOND','SLEUR','SLERR'],
    ['Slovakia','Bratislava','5000000','579.38','21.95','451.99','20.64', '-0.28','48', '1.40','SVKBOND','SVKUR','SVKRR'],
    ['Somalia','Mogadishu','16000000','174','0','82.69','0', '0','0', '4.10','SOMBOND','SOMUR','SOMRR'],
    ['South Africa','Cape Town','60000000','453.45','11.9','363.21','9.05', '9.48','62', '3.10','ZAFBOND','ZAFUR','ZAFRR'],
    ['South Korea','Seoul','52000000','582.4','76.34','398.29','61.33', '1.45','37', '0.70','KORBOND','KORUR','KORRR'],
    ['Spain','Madrid','47000000','802.74','22.07','604.19','19.23', '0.23','96', '-0.40','ESPBOND','ESPUR','ESPRR'],
    ['Sudan','Khartoum','42000000','377','0','204.38','0', '15.80','62', '166.80','SDNBOND','SDNUR','SDNRR'],
    ['Sweden','Stockholm','10000000','957.47','30.42','678.73','27.86', '-0.12','35', '0.80','SWEBOND','SWEUR','SWERR'],
    ['Switzerland','Bern','9000000','1659.91','33.54','1265.75','29.69', '-0.50','41', '-0.80','CHEBOND','CHEUR','CHERR'],
    ['Syria','Damascus','17500000','203.82','33.07','101.49','32.19', '0','77', '13.10','SYRBOND','SYRUR','SYRRR'],
    ['Thailand','Bangkok','70000000','486.21','28.96','276.04','27.02', '1.33','42', '-0.50','THABOND','THAUR','THARR'],
    ['Tunisia','Tunis','12000000','190.50','20.09','127.5','19.59', '6.75','77', '5.40','TUNBOND','TUNUR','TUNRR'],
    ['Turkey','Ankara','83000000','218.56','18.38','134.68','16.1', '14.12','33', '11.70','TURBOND','TURUR','TURRR'],
    ['Uganda','Kampala','43000000','195.3','0','118.66','0', '14.59','40', '4.50','UGABOND','UGAUR','UGARR'],
    ['Ukraine','Kiev','42000000','294.23','15.94','197.86','13.12', '14.71','50', '2.50','UKRBOND','UKRUR','UKRRR'],
    ['United Kingdom','London','68000000','985.51','26.8','784.42','23.97', '0.20','81', '0.20','GBRBOND','GBRUR','GBRRR'],
    ['United States','Washington','330000000','1363.36','11.15','1088.27','9.25', '0.67','107', '1.30','USABOND','USAUR','USARR'],
    ['Uruguay','Montevideo','3500000','416.53','26.13','322.29','25.18', '13.80','61', '9.80','URYBOND','URYUR','URYRR'],
    ['Uzbekistan','Tashkent','34000000','245.83','15.86','153.85','13.76', '14.00','24', '11.70','UZBBOND','UZBUR','UZBRR'],
    ['Venezuela','Caracas','29000000','319.09','0','298.75','0', '46.58','23', '2358.00','VENBOND','VENUR','VENRR'],
    ['Vietnam','Hanoi','96000000','414.4','24.68','286.72','17.6', '2.73','58', '3.00','VNMBOND','VNMUR','VNMRR'],
    ['Yemen','Sanaa','29000000','179.1','0','104.05','0', '27.00','63', '0.80','YEMBOND','YEMUR','YEMRR'],
    ['Zambia','Lusaka','17000000','142.33','0','125.02','0', '32.50','59', '15.70','ZMBBOND','ZMBUR','ZMBRR'],
    ['Zimbabwe','Harare','16000000','301.92','0','230.91','0', '35.00','53', '761.00','ZWEBOND','ZWEUR','ZWERR'],
    ['Côte d\'Ivoire','Yamoussoukro','26000000','623.14','0','197.82','0', '4.00','132', '2.70','CIVBOND','CIVUR','CIVRR'],
    ['Lao PDR','Vientiane','7000000','628.50','0','335.58','0', '3.00','53', '5.10','LAOBOND','LAOUR','LAORR'],
  ]

// Country Name, Capital City, Population, Urban Rent, Urban PE, Rural Rent, Rural PE, Interest Rate, Debt GDP, Inflation Rate

  function apiCountryCall(currentCountry) {
    let num = 0;
    if (currentCountry.length == 14) {
      num = 13;
    }
    wiki().page(currentCountry[num]).then(page => page.summary()).then(response => {
      console.log(response)
      const country = new Country({
      countryName: currentCountry[0],
      capitalCity: currentCountry[1],
      population: currentCountry[2],
      urbanRent: currentCountry[3],
      urbanPE: currentCountry[4],
      ruralRent: currentCountry[5],
      ruralPE: currentCountry[6],
      interestRate: currentCountry[7],
      debtGDP: currentCountry[8],
      inflation: currentCountry[9],
      bondSymbol: currentCountry[10],
      urbanSymbol: currentCountry[11],
      ruralSymbol: currentCountry[12],
        countrySummary: response
    });

    Country.count({countryName: currentCountry[0]}, function (err, count) {
      if (count > 0){
        Country.findOneAndUpdate(
          {countryName: currentCountry[0]},
          {$set:{
            countryName: country['countryName'],
            capitalCity: country['capitalCity'],
            population: country['population'],
            urbanRent: country['urbanRent'],
            urbanPE: country['urbanPE'],
            ruralRent: country['ruralRent'],
            ruralPE: country['ruralPE'],
            interestRate: country['interestRate'],
            debtGDP: country['debtGDP'],
            inflation: country['inflation'],
            bondSymbol: country['bondSymbol'],
            urbanSymbol: country['urbanSymbol'],
            ruralSymbol: country['ruralSymbol'],
              countrySummary: country['countrySummary']
          }},{upsert:false},
          function (error, success) {
            if(error) {
              console.log(error);
            } else {
              console.log(currentCountry[0]);
            }
          }
        );
      } else {
        country.save();
      }
    })})
  }


  const interval = 10000;

  module.exports = {
    getCountries: function () {
      for (let i = 0; i <= country.length - 1; i++) {
        setTimeout(function (i) {apiCountryCall(country[i])}, interval * i, i);
      }
    }
  };
