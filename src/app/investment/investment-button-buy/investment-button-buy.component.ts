import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from '../investment.model';
import { InvestmentService } from '../investment.service';
import {MatTableDataSource} from '@angular/material/table';
import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';  
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StockService } from 'src/app/stocks/stock.service';
import { Stock } from 'src/app/stocks/stock.model';



@Component({
  selector: 'app-investment-button-buy',
  templateUrl: './investment-button-buy.component.html',
  styleUrls: ['./investment-button-buy.component.css'],
})
export class InvestmentBuyButtonComponent {

  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options=['SLV','GLD','TIN', 'USA10Y', 'CAN10Y','NOK','MSFT'];
  stockTicker="MSFT";
  stock: Stock;
  stock2: Stock;

    constructor(private investmentApi: InvestmentService, private stockApi: StockService) {
      this.investmentApi.getInvestments().subscribe(data => {
      });

    }

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    

    /*investmentTypes = [
      {type: 'Bonds',
      symbol: ['USA10Y', 'CAN10Y']},
      {type: 'Commodity',
      symbol: ['SLV','GLD','TIN']},
      {type: 'Currency',
      symbol: ['USDEUR', 'USDYEN']},
      {type: 'Real Estate',
      symbol: ['RRUSA','URMEX']},
      {type: 'Stocks',
      symbol: ['NOK','MSFT']}
    ];*/

  ngOnInit() {
     this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.stockApi.getOneStock(this.stockTicker).subscribe(stockData => {
        this.stock = {
          stockName: stockData.stockName,
          symbol: stockData.symbol,
          price: stockData.price,
          marketCap: stockData.marketCap,
          closeDate: stockData.closeDate,
          pERatio: stockData.pERatio
        };
        console.log("MSFT");
        console.log(this.stock.price[0])
      });
    };
  


  onClickBuy(symbol, shares){
    console.log("Buy ", shares, " shares of ", symbol);
    this.stockApi.getOneStock(symbol).subscribe(stockData2 => {
      this.stock2 = {
        stockName: stockData2.stockName,
        symbol: stockData2.symbol,
        price: stockData2.price,
        marketCap: stockData2.marketCap,
        closeDate: stockData2.closeDate,
        pERatio: stockData2.pERatio
      };

      console.log(this.stock2.price[0]);
      this.investmentApi.buyInvestment("24315",stockData2.stockName,stockData2.symbol,stockData2.price[0],shares);

    });
    
    
  }

  /*onClickBuy(shares, index){

    //Update Row Share/Net Values
    this.dataSource[index].shares=(this.dataSource[index].shares + +shares); // The + converts shares into a number from string
    this.dataSource[index].net=((this.dataSource[index].currentPrice - this.dataSource[index].purchasePrice) * this.dataSource[index].shares);
    
    // Top Line Values
    this.netValue=Math.round((this.calculateNet(this.dataSource) * 100)/100);
    this.cashValue=Math.round(((this.cashValue - (this.dataSource[index].currentPrice * shares) ) * 100)/100);
    this.investmentValue=Math.round((this.calculateAssets(this.dataSource) * 100)/100);

  }

  onClickSell(shares, index){

    //Update Row Share/Net Values
    this.dataSource[index].shares=(this.dataSource[index].shares - +shares); // The + converts shares into a number from string.
    this.dataSource[index].net=((this.dataSource[index].currentPrice - this.dataSource[index].purchasePrice) * this.dataSource[index].shares);
    
    // Top Line Values
    this.netValue=Math.round((this.calculateNet(this.dataSource) * 100)/100);
    this.cashValue=Math.round(((this.cashValue + (this.dataSource[index].currentPrice * shares) ) * 100)/100);
    this.investmentValue=Math.round((this.calculateAssets(this.dataSource) * 100)/100);

  }*/

  
};