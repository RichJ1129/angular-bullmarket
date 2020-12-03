import { Component, OnInit, Input, Output } from '@angular/core';
import { Currency } from '../currency.model';
import { CurrencyService } from '../currency.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {InvestmentService} from '../../investment/investment.service';
import {InvestmentBoxService} from '../../investmentbox/investmentbox.service';

@Component({
  selector: 'app-currency-page',
  templateUrl: './currency-page.component.html',
  styleUrls: ['./currency-page.component.css']
})
export class CurrencyPageComponent implements OnInit {

  constructor(
    public currencyService: CurrencyService,
    public route: ActivatedRoute,
    public datePipe: DatePipe,
    private investmentServiceApi: InvestmentService,
    private investmentApi: InvestmentBoxService
  ) {
    this.investmentApi.getUserID().subscribe(data => {
    this.userObject = data;
    this.UID = this.userObject._id;
  });
  }

  show = false;
  isLoading = false;

  displayedColumns: any[] = ['currencyName', 'ticker', 'rates'];
  currency: Currency;
  private currencyTicker: string;
  currencyValue = new FormControl('');
  chartType = 'line';
  chartData: ChartDataSets[] =  [
    {data: [], label: '10 Day Currency Prices', fill: false, lineTension: 0},
  ];
  UID: string;
  userObject: any;
  chartLabels = [];
        //Get Today's Date
        today = new Date();
        dd = String(this.today.getDate()).padStart(2,'0');
        mm = String(this.today.getMonth() + 1).padStart(2,'0');
        yyyy = this.today.getFullYear();
      
        todayString = this.yyyy + '-' + this.mm + '-' + this.dd;

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false
        }
      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 5,
          borderColor: 'grey',
          borderWidth: 2,
          borderDash: [4, 4],
          label: {
            enabled: false,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }]
    }
  };

  chartColor = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

  public lineChartPlugins = [pluginAnnotations];

  public changeAnnotation(currencyRate): void {
    this.lineChartOptions.annotation.annotations[0].value = currencyRate;
  }

  public changeLineColor(yesterdayPrice, todayPrice): void {
    if (todayPrice > yesterdayPrice){
      this.chartColor[0].borderColor = 'rgb(0,200,7)';
    }
    else if (todayPrice < yesterdayPrice) {
      this.chartColor[0].borderColor = 'rgb(255,80,0)';
    }
  }


  public computeData(): void {
    // this.chartData[0].data = this.currency.rates;
    this.chartData[0].data = this.currency.rates.slice(this.currency.rates.length - 10);


    const transformedDates = [];
    console.log(this.currency.timeStamp);

    for (const i of this.currency.timeStamp){
      transformedDates.push(this.datePipe.transform(i, 'MM-dd'));
    }

    this.chartLabels = transformedDates.slice(transformedDates.length - 10);
  }

  public buyCurrency(currencyAmount): void {
    let currencyBalance;
    const currency = 'DOLLAR';

    this.investmentServiceApi.getCurrencyBalance(this.UID, currency).then(data => {
      currencyBalance = data;
      const purchaseAmount =  currencyAmount / this.currency.rates[this.currency.rates.length - 1];
      if (currencyBalance < purchaseAmount) {

      } else {
        this.investmentApi.removeBaseCurrency(this.UID, currency, -purchaseAmount, this.todayString);
        this.investmentApi.buyInvestment(this.UID, this.currency.currencyName,
          this.currency.ticker, purchaseAmount,
          currencyAmount, 'b', 'Currency', this.todayString);
      }
    });
  }



  public sellCurrency(currencyAmount): void {
    let numberShares;
    const currency = 'DOLLAR';

    this.investmentServiceApi.numberOfShares(this.UID, this.currency.ticker).then(data => {
      numberShares = data;

      const sellAmount = currencyAmount / this.currency.rates[this.currency.rates.length - 1];
      console.log(sellAmount);
      if (currencyAmount > numberShares) {

      } else {
        this.investmentApi.addBaseCurrency(this.UID, currency, sellAmount, this.todayString);
        this.investmentApi.sellInvestment(this.UID,
          this.currency.currencyName, this.currency.ticker,
          this.currency.rates[this.currency.rates.length - 1],
          -Math.abs(numberShares),
          's', 'Currency', this.todayString);
      }
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('currency_ticker')) {
        this.isLoading = true;
        this.currencyTicker = paramMap.get('currency_ticker');
        this.currencyService.getOneCurrency(this.currencyTicker).subscribe(currencyData => {
          this.currency = {
            currencyName: currencyData.currencyName,
            ticker: currencyData.ticker,
            rates: currencyData.rates,
            timeStamp: currencyData.timeStamp
          };
          this.changeAnnotation(this.currency.rates[this.currency.rates.length - 10]);
          this.changeLineColor(this.currency.rates[this.currency.rates.length - 2], this.currency.rates[this.currency.rates.length - 1]);
          this.computeData();
          this.isLoading = false;
        });
      }
    });
  }

}
