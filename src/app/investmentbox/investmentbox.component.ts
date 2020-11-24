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
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { InvestmentList } from './investmentList';

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
  
  //Get UserID and Setup Services
    constructor(private investmentApi: InvestmentBoxService, private stockApi: StockService) {
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
      /*Check Incoming Information
      console.log("investmentData: ")
      console.log(this.stock2.price[0]);
      console.log(this.UID);
      console.log("currency change of: ", amount);*/

      // Update Cash Balance
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

    //Retrieve Information


    //Update Currency


    //Sell Investment


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
    else if(result[0].type=="Real Estate"){
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Sell Investment

    }
  }


  onClickSell(symbol, shares){
    var currency = "DOLLAR";
    var amount = 0;
    console.log("Sell ", shares, " shares of ", symbol);

    //Retrieve Symbol, Type, Name
    var result = InvestmentList.filter(obj => {
      return obj.name === name;
    })

    if(result[0].type=="Stock"){
    //Retrieve Stock Information
    this.stockApi.getOneStock(symbol).subscribe(stockData2 => {
      this.stock2 = {
        stockName: stockData2.stockName,
        symbol: stockData2.symbol,
        price: stockData2.price,
        marketCap: stockData2.marketCap,
        closeDate: stockData2.closeDate,
        pERatio: stockData2.pERatio
      };
      /*Check Incoming Information
      console.log("investmentData: ")
      console.log(this.stock2.price[0]);
      console.log(this.UID);
      console.log("currency change of: ", amount); */

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

    //Retrieve Information


    //Update Currency


    //Sell Investment

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
  else if(result[0].type=="Real Estate"){
    console.log(result[0].type);
    console.log(result[0].name);
    console.log(result[0].symbol);

    //Retrieve Information


    //Update Currency


    //Sell Investment

  }
  
  }

 
};