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
import { CurrencyService } from 'src/app/currency/currency.service'
import { Currency } from 'src/app/currency/currency.model'
import { CommodityService } from 'src/app/commodities/commodity.service'
import { Commodity } from 'src/app/commodities/commodity.model'

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
};

@Component({
    selector: 'app-investmentboxhome',
    templateUrl: './investmentboxhome.component.html',
    styleUrls: ['./investmentbox.component.css'],
})

export class InvestmentBoxHomeComponent {
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
    assetPrice = "$";
    assetSymbol = "";

    //Get UserID and Setup Services
      constructor(private investmentApi: InvestmentBoxService, private stockApi: StockService, private countryApi: RealEstateService, private currencyApi: CurrencyService, private commodityApi: CommodityService) {
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

    onClickSearch(name, shares){
        let currency = "DOLLAR"; let amount = 0;

        // Retrieve Symbol, Type, Name
        let result = InvestmentList.filter(obj => {
          return obj.name === name;
        })

        if(result[0].type=="Stock"){
          // Retrieve Stock Information
          this.stockApi.getOneStock(result[0].symbol).subscribe(stockData2 => {
            this.stock2 = { stockName: stockData2.stockName, symbol: stockData2.symbol, price: stockData2.price, marketCap: stockData2.marketCap, closeDate: stockData2.closeDate, pERatio: stockData2.pERatio };

            setTimeout(() => {
                this.assetPrice="$ "+ (+(Math.round((stockData2.price[0]) * 100) / 100).toFixed(2)).toString();
                this.assetSymbol = stockData2.symbol;
                },500);

        });
        }
        else if(result[0].type=="Bond"){

          this.countryname = result[0].country;

          // Retrieve Bond-Country Information
          this.countryApi.getOneCountry(this.countryname).subscribe(countryData => {
            this.country = {
             countryName: countryData.countryName, capitalCity: countryData.capitalCity, population: countryData.population, urbanRent: countryData.urbanRent, urbanPE: countryData.urbanPE, ruralRent: countryData.ruralRent, ruralPE: countryData.ruralPE,
             interestRate: countryData.interestRate, debtGDP: countryData.debtGDP, inflation: countryData.inflation, bondSymbol: countryData.bondSymbol, urbanSymbol: countryData.urbanSymbol, ruralSymbol: countryData.ruralSymbol,
          };


            setTimeout(() => {
                this.assetPrice="$ "+ (1).toString();
                this.assetSymbol = this.country.bondSymbol;
                },500);

        });
        }
        else if(result[0].type=="Currency"){

        // Retrieve Information
        this.currencyApi.getOneCurrency(result[0].symbol).subscribe(currencyData => {
          this.currency = { currencyName: currencyData.currencyName, ticker: currencyData.ticker, rates: currencyData.rates, timeStamp: currencyData.timeStamp};
    //Bug Fix and Restrict to 2 Decimal Points
          setTimeout(() => {
            this.assetPrice="$ "+ (+(Math.round((1/this.currency.rates[0]) * 100) / 100).toFixed(2)).toString();
            this.assetSymbol = this.currency.ticker;
            },500);
        });
        }
        else if(result[0].type=="Commodity"){

        //Retrieve Information
        this.commodityApi.getOneCommodity(result[0].symbol).subscribe(commodityData => {
          this.commodity = {commodityName: commodityData.commodityName, symbol: commodityData.symbol, etfPrice: commodityData.etfPrice, commodityUnit: "", closeDate: [] };

              });

              //Retrive Price, Symbol
              setTimeout(() => {
                this.assetPrice="$ "+ (+(Math.round((this.commodity.etfPrice[0]) * 100) / 100).toFixed(2)).toString();
                this.assetSymbol = this.commodity.symbol;
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
          this.realEstatePrice = (+(Math.round(((countryData.urbanPE * countryData.urbanRent ) * 12) * 100) / 100).toFixed(2));
          setTimeout(() => {
            this.assetPrice="$ "+ (this.realEstatePrice).toString();
            this.assetSymbol = this.country.urbanSymbol;
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
          this.realEstatePrice = (+(Math.round(((countryData.ruralPE * countryData.ruralRent ) * 12) * 100) / 100).toFixed(2));
          setTimeout(() => {
            this.assetPrice="$ "+ (this.realEstatePrice).toString();
            this.assetSymbol = this.country.ruralSymbol;
            },500);
        });
        }
      }


  }
