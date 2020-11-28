import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import { InvestmentService } from './investment.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';   
import {Subject } from 'rxjs';

interface InvestmentMath{
    name: string;
    symbol: string;
    type: string;
    shares: number;
    currentPrice: number;
    transactionPrice: number;
  };

@Component({
  selector: 'app-investmentportfolio',
  templateUrl: './investmentportfolio.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentPortfolioComponent implements OnInit, OnDestroy{

  InvestmentData: any = [];
  CurrencyData: any = [];
  FormattedCurrency: MatTableDataSource<InvestmentMath>;

  investments: InvestmentMath[] =[];
  displayedColumns: string[] = ['name', 'symbol', 'type', 'shares', 'currentPrice', 'transactionPrice'];
  dataSource: MatTableDataSource<InvestmentMath>;
  investmentValue=0;
  currencyValue: number;
  portfolio: any[]=[];
  
  
  private investmentSub: Subscription;
  UID: string;
  userObject: any;

    constructor(private investmentApi: InvestmentService) {
      
      //Retrieve User ID
      this.investmentApi.getUserID().subscribe(data => {
        this.userObject=data;
        this.UID = this.userObject._id;
      
     //Portfolio History
      this.investmentApi.getInvestments(this.UID).then(data => {
        this.portfolio=data;
        //console.log("did it work?",data);
        this.dataSource = new MatTableDataSource<InvestmentMath>(data);

      });


     //Total Investment Value
      this.investmentApi.getInvestmentValue(this.UID).then(result => {
        this.investmentValue = result;
      });

     //Currency Balance
       this.investmentApi.getCurrencyBalance(this.UID,"DOLLAR").then(result =>{
         this.currencyValue = result;
      });
    });
  }

  ngOnInit() {
    this.investmentSub = this.investmentApi.getInvestmentUpdateListener2()
      .subscribe((investments: InvestmentMath[]) => {
        this.dataSource = new MatTableDataSource<InvestmentMath>(investments);
      });
  }

  ngOnDestroy(){
    this.investmentSub.unsubscribe();
  }
};
