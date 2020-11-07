import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from '../investment.model';
import { InvestmentService } from '../investment.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   


@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.css'],
})
export class InvestmentPageComponent {

  InvestmentData: any = [];
  displayedColumns: string[] = ['name', 'symbol', 'shares', 'currentPrice', 'purchasePrice', 'net'];
  dataSource: MatTableDataSource<Investment>;
  investmentValue; netValue; cashValue;

    constructor(private investmentApi: InvestmentService) {
      this.investmentApi.getInvestments().subscribe(data => {
        this.InvestmentData = data;
        
        // Set a placeholder value in current price in order to test net value and netValue/cashValue/investmentValue variables at top of
        for(var x=0; x<this.InvestmentData.length; x++){
          this.InvestmentData[x].currentPrice = +(this.InvestmentData[x].purchasePrice)+1;
          this.InvestmentData[x].net = (+this.InvestmentData[x].currentPrice)-(+this.InvestmentData[x].purchasePrice);
        }
        //
        this.dataSource = new MatTableDataSource<Investment>(this.InvestmentData);


        this.investmentValue=1//Math.round((this.calculateAssets(this.dataSource) * 100)/100);
        this.netValue=2//Math.round((this.calculateNet(this.dataSource) * 100)/100);
        this.cashValue=3//Math.round((this.calculateAssets(this.dataSource) * 100)/100);
        console.log("Hello");
        console.log(this.dataSource);
      });
    }


  ngOnInit() {
  }


  calculateAssets(data){
    let assetValue=0;
    for (let i in data){
      assetValue += (data[i].currentPrice * data[i].shares);
    }
    return assetValue;
  }

  calculateNet(data){
    let netValue=0;
    for (let i in data){
      netValue += (data[i].net);
    }
    return netValue;
  }

  getCurrentPrices(data){
    for (let i in data){
      data[i].currentPrice = data[i].purchasePrice + 1;
    }
    return data;
  }

  getRowNet(data, i){
      data[i].net = ((data[i].currentPrice - data[i].purchasePrice) * data[i].shares);
  }




};


/*
const INVESTMENT_DATA: Investment[] = [
  {
    name: 'GOLD',
    symbol: 'GLD',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: +65.80
  },
  {
    name: 'SILVER',
    symbol: 'SLV',
    shares: 10,
    currentPrice: 190,
    purchasePrice: 183.42,
    net: +65.80
  },
  {
    name: 'OIL',
    symbol: 'USO',
    shares: 25,
    currentPrice: 27.88,
    purchasePrice: 29.07,
    net: -29.75
  },
  {
    name: 'MICROSOFT',
    symbol: 'MSFT',
    shares: 30,
    currentPrice: 218.55,
    purchasePrice: 188.00,
    net: +916.50
  },
  {
    name: 'NOKIA',
    symbol: 'NOK',
    shares: 200,
    currentPrice: 4.06,
    purchasePrice: 2.50,
    net: +312
  },
  {
    name: 'COSTA RICA RURAL',
    symbol: 'RRCOS',
    shares: 1,
    currentPrice: 32400,
    purchasePrice: 32500,
    net: -100
  },
  {
    name: 'EUROS',
    symbol: 'EURUSD',
    shares: 10000,
    currentPrice: 1.17,
    purchasePrice: 1.10,
    net: +700
  }
]; */