import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
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
  
  //Get UserID and Setup Services
    constructor(private investmentApi: InvestmentBoxService, private stockApi: StockService, private countryApi: RealEstateService) {
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
  

  onClickBuy(name, shares){
    var currency = "DOLLAR";
    var amount = 0;
    console.log("Buy ", shares, " shares of ", name);

    //Retrieve Symbol, Type, Name
    var result = InvestmentList.filter(obj => {
      return obj.name === name;
    })

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

      // Update Currency
      amount = -Math.abs((stockData2.price[0] * shares))
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);

      // Buy Stock
      this.investmentApi.buyInvestment(this.UID,this.stock2.stockName,this.stock2.symbol,this.stock2.price[0],shares,'b','stock');
    
    });
    }
    else if(result[0].type=="Bond"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);
      console.log(result[0].country);
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

      //Update Currency
      amount = -Math.abs(shares)
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);

      // Buy Bond
      this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,1,shares,'b','bond');

    });
    }
    else if(result[0].type=="Currency"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Buy Investment

    }
    else if(result[0].type=="Commodity"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Buy Investment

    }
    else if(result[0].type=="Urban Real Estate"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);

    //Retrieve Information
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);
      console.log(result[0].country);
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
     
      //Update Currency
      this.realEstatePrice = ((countryData.urbanPE * countryData.urbanRent ) * 12);

      amount = -Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);

      // Buy Real Estate
      this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,shares,'b','realestate');
      this.realEstatePrice = 0;
    });
    }
    else if(result[0].type=="Rural Real Estate"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);

    //Retrieve Information
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);
      console.log(result[0].country);
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
     
      //Update Currency
      this.realEstatePrice = ((countryData.ruralPE * countryData.ruralRent ) * 12);

      amount = -Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
      this.investmentApi.removeBaseCurrency(this.UID,currency,amount);

      // Buy Real Estate
      this.investmentApi.buyInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,shares,'b','realestate');
      this.realEstatePrice = 0;
    });
    }
  }


  onClickSell(name, shares){
    var currency = "DOLLAR";
    var amount = 0;
    console.log("Sell ", shares, " shares of ", name);

    //Retrieve Symbol, Type, Name
    var result = InvestmentList.filter(obj => {
      return obj.name === name;
    })

    console.log("Type:");
    console.log(result[0].type);

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

      //Update Currency
      amount = (stockData2.price[0] * shares)
      this.investmentApi.addBaseCurrency(this.UID,currency,amount);

      //Sell Investment
      this.investmentApi.sellInvestment(this.UID,this.stock2.stockName,this.stock2.symbol,this.stock2.price[0],-Math.abs(shares),'s','stock');
    });
  }
  else if(result[0].type=="Bond"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);
    console.log(result[0].country);
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

    //Update Currency
    amount = Math.abs(shares)
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Bond
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,1,-(shares),'s','bond');

  });
  }
  else if(result[0].type=="Currency"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Sell Investment

  }
  else if(result[0].type=="Commodity"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Sell Investment

  }
  else if(result[0].type=="Urban Real Estate"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);

  //Retrieve Information
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);
    console.log(result[0].country);
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
   
    //Update Currency
    this.realEstatePrice = ((countryData.urbanPE * countryData.urbanRent ) * 12);

    amount = Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Real Estate
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,-(shares),'s','realestate');
    this.realEstatePrice = 0;


  });
  }
  else if(result[0].type=="Rural Real Estate"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);

  //Retrieve Information
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);
    console.log(result[0].country);
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
   
    //Update Currency
    this.realEstatePrice = ((countryData.ruralPE * countryData.ruralRent ) * 12);

    amount = Math.abs(Math.round((shares * this.realEstatePrice)*100) / 100);
    this.investmentApi.addBaseCurrency(this.UID,currency,amount);

    // Sell Real Estate
    this.investmentApi.sellInvestment(this.UID,result[0].name,result[0].symbol,this.realEstatePrice,-(shares),'s','realestate');
    this.realEstatePrice = 0;
  });
  }
  
  }

 
};