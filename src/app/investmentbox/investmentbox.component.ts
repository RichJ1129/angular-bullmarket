import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from 'src/app/investment/investment.service';
import { InvestmentBoxService } from './investmentbox.service';
import {MatTableDataSource} from '@angular/material/table';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StockService } from 'src/app/stocks/stock.service';
import { Stock } from 'src/app/stocks/stock.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { InvestmentList } from './investmentList';
import { RealEstateService } from 'src/app/realestate/realestate.service';
import { Country } from 'src/app/realestate/country.model';
import { CurrencyService } from 'src/app/currency/currency.service';
import { Currency } from 'src/app/currency/currency.model';
import { CommodityService } from 'src/app/commodities/commodity.service';
import { Commodity } from 'src/app/commodities/commodity.model';

//User ID Interface
interface IDAuthData{
  _id: string;
  email: string;
  userName: string;
};

//Symbol + Type Lookup Interface
interface InvestmentForm {
  symbol: string;
  name: string;
  type: string;
  country: string;
}

@Component({
  selector: 'app-investmentbox',
  templateUrl: './investmentbox.component.html',
  styleUrls: ['./investmentbox.component.css'],
})
export class InvestmentBoxComponent {

  myControl = new FormControl();
  stock: Stock;
  stock2: Stock;
  UID: string;
  userObject: any;
  filteredInvestments: Observable<InvestmentForm[]>;
  country: Country;
  countryname: string;
  realEstatePrice: number;
  tempvar: string;
  currency: Currency;
  commodity: Commodity;
  perSharePrice = "$";
  totalPrice = "$";
  minimumShares:number=0;

  //Get UserID and Setup Services
    constructor(private investmentApi: InvestmentBoxService, private investmentServiceApi: InvestmentService, private stockApi: StockService, private countryApi: RealEstateService, private currencyApi: CurrencyService, private commodityApi: CommodityService) {
        this.investmentApi.getUserID().subscribe(data => {
          this.userObject=data;
          this.UID = this.userObject._id;
      });

    }

  //Filter Search Query - Source Angular Docs AutoComplete
    private _filter(name: string): InvestmentForm[] {
      const filterValue = name.toLowerCase();
      return InvestmentList.filter(investment => investment.name.toLowerCase().indexOf(filterValue) === 0);
    }

  //Attach Search Query to InvestmentForm object
    displayFn(investment: InvestmentForm): string {
      return investment && investment.name ? investment.name : '';
    }


//Filter Search Query - Source Angular Docs AutoComplete
  ngOnInit() {
    this.filteredInvestments = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : InvestmentList.slice())
    );
  };

  onClickPrice(name, shares){
    let currency = "DOLLAR"; let amount = 0;

    //Retrieve Symbol, Type, Name
    let result = InvestmentList.filter(obj => {
      return obj.name === name;
    })

    if(result[0].type=="Stock"){
      //Retrieve Stock Information
      this.stockApi.getOneStock(result[0].symbol).subscribe(stockData2 => {
        this.stock2 = { stockName: stockData2.stockName, symbol: stockData2.symbol, price: stockData2.price, marketCap: stockData2.marketCap, closeDate: stockData2.closeDate, pERatio: stockData2.pERatio };

        setTimeout(() => {
          this.perSharePrice="$ "+ (stockData2.price[0]).toString();
          this.totalPrice="$ "+ (stockData2.price[0] * shares).toString();
          },500);

    });
    }
    else if(result[0].type=="Bond"){

      this.countryname = result[0].country;

      //Retrieve Bond-Country Information
      this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
        this.country = {
         countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE, ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE,
         interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation, bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

      setTimeout(() => {
        this.perSharePrice="$ "+ (1).toString();
        this.totalPrice="$ "+ (shares).toString();
        },500);


    });
    }
    else if(result[0].type=="Currency"){

    //Retrieve Information
    this.currencyApi.getOneCurrency(result[0].symbol).subscribe(currencyData => {
      this.currency = { currencyName: currencyData.currencyName, ticker: currencyData.ticker, rates: currencyData.rates, timeStamp: currencyData.timeStamp};

      setTimeout(() => {
        this.perSharePrice="$ "+ (this.currency.rates[0]).toString();
        this.totalPrice="$ "+ (this.currency.rates[0] * shares).toString();
        },500);
    });
    }
    else if(result[0].type=="Commodity"){

    //Retrieve Information
    this.commodityApi.getOneCommodity(result[0].symbol).subscribe(commodityData => {
      this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: "", closeDate: [] };

          });

      //Update Share and Total Price after 0.5s Delay for Data Retrieval
      setTimeout(() => {
      this.perSharePrice="$ "+this.commodity.etfPrice[0].toString();
      this.totalPrice="$ "+(this.commodity.etfPrice[0] * shares).toString();
      },500);
    }
    else if(result[0].type=="Urban Real Estate"){
      this.countryname = result[0].country;

    //Retrieve Information
    this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
      this.country = {
        countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE, ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE, interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation, bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

      //Calculate Real Estate Price, Display Result after 0.5s Delay
      this.realEstatePrice = ((countryData.urbanPE * countryData.urbanRent ) * 12);
      setTimeout(() => {
        this.perSharePrice="$ "+ (this.realEstatePrice).toString();
        this.totalPrice="$ "+ (this.realEstatePrice * shares).toString();
        },500);
    });
    }
    else if(result[0].type=="Rural Real Estate"){

      this.countryname = result[0].country;

    //Retrieve Information
    this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
      this.country = {
        countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE,
        ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE, interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation,
        bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

      //Calculate Real Estate Price, Display Result after 0.5s Delay
      this.realEstatePrice = ((countryData.ruralPE * countryData.ruralRent ) * 12);
      setTimeout(() => {
        this.perSharePrice="$ "+ (this.realEstatePrice).toString();
        this.totalPrice="$ "+ (this.realEstatePrice * shares).toString();
        },500);
    });
    }
  }


  onClickBuy(name, shares){
    let currency = "DOLLAR"; let amount = 0;
    let currencyBalance;

    this.investmentServiceApi.getCurrencyBalance(this.UID,"DOLLAR").then(data =>{
      currencyBalance = data;


    //Retrieve Symbol, Type, Name
    let result = InvestmentList.filter(obj => {
      return obj.name === name;
    })

    if(result[0].type=="Stock"){
      //Retrieve Stock Information
      this.stockApi.getOneStock(result[0].symbol).subscribe(stockData2 => {
        this.stock2 = { stockName: stockData2.stockName, symbol: stockData2.symbol, price: stockData2.price, marketCap: stockData2.marketCap, closeDate: stockData2.closeDate, pERatio: stockData2.pERatio };

        // Check Available Balance
        amount = -Math.abs((stockData2.price[0] * shares));

        if((Math.abs(amount))<currencyBalance){
          //Update Currency
          this.investmentApi.removeBaseCurrency(this.UID, currency, amount);
          // Buy Stock
          this.investmentApi.buyInvestment(this.UID, this.stock2.stockName, this.stock2.symbol, this.stock2.price[0], shares,'b','Stock');
        }else{console.log('Not enough money'); }
    });
    }
    else if(result[0].type=="Bond"){

      this.countryname = result[0].country;

      //Retrieve Bond-Country Information
      this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
        this.country = {
         countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE, ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE,
         interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation, bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

      // Check Available Balance
      amount = -Math.abs(shares)

      if((Math.abs(amount))<currencyBalance){
        //Update Currency
        this.investmentApi.removeBaseCurrency(this.UID,currency,amount);
        // Buy Bond
        this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,1,shares,'b','Bond');
      }{console.log("Not enough money")};
    });
    }
    else if(result[0].type=="Currency"){

    //Retrieve Information
    this.currencyApi.getOneCurrency(result[0].symbol).subscribe(currencyData => {
      this.currency = { currencyName: currencyData.currencyName, ticker: currencyData.ticker, rates: currencyData.rates, timeStamp: currencyData.timeStamp};

    // Check Available Balance
    amount = -Math.abs(shares)

    if((Math.abs(amount))<currencyBalance){
      //Update Currency
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);
      // Buy Investment Currency
      this.investmentApi.buyInvestment(this.UID, currencyData.currencyName, currencyData.ticker, currencyData.rates[0], shares, 'b','Currency');
    }else{console.log("Not enough money")};
    });
    }
    else if(result[0].type=="Commodity"){

    //Retrieve Information
    this.commodityApi.getOneCommodity(result[0].symbol).subscribe(commodityData => {
      this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: "", closeDate: [] };
    });


    // Check Available Balance
    amount = -Math.abs(shares * this.commodity.etfPrice[0]);

    if((Math.abs(amount))<currencyBalance){
      //Update Currency
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);
      //Buy Commodity
      this.investmentApi.buyInvestment(this.UID,this.commodity.commodityName,this.commodity.symbol,this.commodity.etfPrice[0],shares,'b','Commodity');
    }
    else{console.log("Not enough money")};
    }
    else if(result[0].type=="Urban Real Estate"){
      this.countryname = result[0].country;

    //Retrieve Information
    this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
      this.country = {
        countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE, ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE, interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation, bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

    //Update Currency
    this.realEstatePrice = ((countryData.urbanPE * countryData.urbanRent ) * 12);

    //Check Available Balance
    amount = -Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);

    if((Math.abs(amount))<currencyBalance){
      //Update Currency
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);
      // Buy Real Estate
      this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,shares,'b','Real Estate');
      this.realEstatePrice = 0;
    }
    else{console.log('Not enough money')}
    });
    }
    else if(result[0].type=="Rural Real Estate"){

      this.countryname = result[0].country;

    //Retrieve Information
    this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
      this.country = {
        countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE,
        ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE, interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation,
        bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
      };

      //Check Available Balance
      this.realEstatePrice = ((countryData.ruralPE * countryData.ruralRent ) * 12);
      amount = -Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);

      if((Math.abs(amount))<currencyBalance){
        //Update Currency
        this.investmentApi.removeBaseCurrency(this.UID,currency,amount);

        // Buy Real Estate
        this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,shares,'b','Real Estate');
        this.realEstatePrice = 0;
      }else{console.log("Not enough money")};
    });
    } setTimeout(() => {location.reload();},700);
  });
  }


  onClickSell(name, shares){
    let currency = "DOLLAR";
    let amount = 0;

    //Retrieve Symbol, Type, Name
    let result = InvestmentList.filter(obj => {
      return obj.name === name;
    })


    this.investmentServiceApi.numberOfShares(this.UID, result[0].symbol).then(data => {
      this.minimumShares=data;


    setTimeout(function(){}, 3000);

    if(result[0].type=="Stock"){
    //Retrieve Stock Information
    this.stockApi.getOneStock(result[0].symbol).subscribe(stockData2 => {
      this.stock2 = {
        stockName: stockData2.stockName,
        symbol: stockData2.symbol,
        price: stockData2.price,
        marketCap: stockData2.marketCap,
        closeDate: stockData2.closeDate,
        pERatio: stockData2.pERatio
      };

      //Check Share Ownership
      if(this.minimumShares>=shares){
      //Update Currency
      amount = (stockData2.price[0] * shares)
      this.investmentApi.addBaseCurrency(this.UID,currency,amount);

      //Sell Investment
      this.investmentApi.sellInvestment(this.UID,this.stock2.stockName,this.stock2.symbol,this.stock2.price[0],-Math.abs(shares),'s','Stock');
    }else{console.log("Not enough shares");}
    });
  }
  else if(result[0].type=="Bond"){
    this.countryname = result[0].country;

  //Retrieve Information
  this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
    this.country = {
      countryName: countryData.countryName,
      capitalCity: countryData.capitalCity,
      population: countryData.population,
      urbanRent: countryData.urbanRent,
      urbanPE: countryData.urbanPE,
      ruralRent: countryData.ruralRent,
      ruralPE: countryData.ruralPE,
      interestRate: countryData.interestRate,
      debtGDP: countryData.debtGDP,
      inflation: countryData.inflation,
      bondSymbol: countryData.bondSymbol,
      urbanSymbol: countryData.urbanSymbol,
      ruralSymbol: countryData.ruralSymbol,
    };
    //Check Share Ownership
    if(this.minimumShares>=shares){
    //Update Currency
    amount = Math.abs(shares)
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Bond
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,1,-(shares),'s','Bond');
    }else{console.log("Not enough shares");}
  });
  }
  else if(result[0].type=="Currency"){

  //Retrieve Information
  this.currencyApi.getOneCurrency(result[0].symbol).subscribe(currencyData => {
    this.currency = {
      currencyName: currencyData.currencyName,
      ticker: currencyData.ticker,
      rates: currencyData.rates,
      timeStamp: currencyData.timeStamp,
    };

  //Check Share Ownership
  if(this.minimumShares>=shares){
  //Update Base Currency
  amount = Math.abs(shares)
  this.investmentApi.addBaseCurrency(this.UID,currency,amount);

  // Sell Investment Currency
  this.investmentApi.sellInvestment(this.UID,currencyData.currencyName,currencyData.ticker,currencyData.rates[0],-(shares),'b','Currency');
  }else{console.log("Not enough shares");}
  });
  }
  else if(result[0].type=="Commodity"){

  //Retrieve Information
  this.commodityApi.getOneCommodity(result[0].symbol).subscribe(commodityData => {
   this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: "", closeDate: [] };
   });

  //Check Share Ownership
  if(this.minimumShares>=shares){
  //Update Currency
  amount = Math.abs(shares * this.commodity.etfPrice[0]);
  this.investmentApi.addBaseCurrency(this.UID,currency,amount);

  //Buy Investment
  this.investmentApi.sellInvestment(this.UID,this.commodity.commodityName,this.commodity.symbol,this.commodity.etfPrice[0],-(shares),'s','Commodity');
  }else{console.log("Not enough shares");}
  }
  else if(result[0].type=="Urban Real Estate"){

  //Retrieve Information
    this.countryname = result[0].country;

  //Retrieve Information
  this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
    this.country = {
      countryName: countryData.countryName,
      capitalCity: countryData.capitalCity,
      population: countryData.population,
      urbanRent: countryData.urbanRent,
      urbanPE: countryData.urbanPE,
      ruralRent: countryData.ruralRent,
      ruralPE: countryData.ruralPE,
      interestRate: countryData.interestRate,
      debtGDP: countryData.debtGDP,
      inflation: countryData.inflation,
      bondSymbol: countryData.bondSymbol,
      urbanSymbol: countryData.urbanSymbol,
      ruralSymbol: countryData.ruralSymbol,
    };

    //Check Share Ownership
    if(this.minimumShares>=shares){
    //Update Currency
    this.realEstatePrice = ((countryData.urbanPE * countryData.urbanRent ) * 12);

    amount = Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Real Estate
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,-(shares),'s','Real Estate');
    this.realEstatePrice = 0;
    }else{console.log("Not enough shares");}

  });
  }
  else if(result[0].type=="Rural Real Estate"){

  //Retrieve Information
    this.countryname = result[0].country;

  //Retrieve Information
  this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
    this.country = {
      countryName: countryData.countryName,
      capitalCity: countryData.capitalCity,
      population: countryData.population,
      urbanRent: countryData.urbanRent,
      urbanPE: countryData.urbanPE,
      ruralRent: countryData.ruralRent,
      ruralPE: countryData.ruralPE,
      interestRate: countryData.interestRate,
      debtGDP: countryData.debtGDP,
      inflation: countryData.inflation,
      bondSymbol: countryData.bondSymbol,
      urbanSymbol: countryData.urbanSymbol,
      ruralSymbol: countryData.ruralSymbol,
    };

    //Check Share Ownership
    if(this.minimumShares>=shares){
    //Update Currency
    this.realEstatePrice = ((countryData.ruralPE * countryData.ruralRent ) * 12);

    amount = Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Real Estate
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,-(shares),'s','Real Estate');
    this.realEstatePrice = 0;
    }else{console.log("Not enough shares");}
  });
  } setTimeout(() => {location.reload();},700);
});
  }


};

