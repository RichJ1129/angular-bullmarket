import {Component, OnInit, Input, Output} from '@angular/core';
import {Stock, Company} from '../stock.model';
import {StockService} from '../stock.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {InvestmentService} from '../../investment/investment.service';
import {HeaderComponent} from '../../layout/header/header.component';
import {InvestmentBoxService} from '../../investmentbox/investmentbox.service';
import {Currency} from '../../currency/currency.model';


@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  constructor(
    public stocksService: StockService,
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

  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];
  stock: Stock;
  currency: Currency;
  company: { companyCurrency: string; companySummary: string; companyCountry: string };
  private stockTicker: string;
  stockValue = new FormControl('');
  UID: string;
  userObject: any;

      // Get Today's Date
      today = new Date();
      dd = String(this.today.getDate()).padStart(2, '0');
      mm = String(this.today.getMonth() + 1).padStart(2, '0');
      yyyy = this.today.getFullYear();

      todayString = this.yyyy + '-' + this.mm + '-' + this.dd;

  chartType = 'line';
  chartData: ChartDataSets[] = [
    {data: [], label: '10 day Stock Price', fill: false, lineTension: 0},
  ];

  chartLabels = [];

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

  public changeAnnotation(stockPrice): void {
    this.lineChartOptions.annotation.annotations[0].value = stockPrice;
  }

  public changeLineColor(yesterdayPrice, todayPrice): void {
    if (todayPrice > yesterdayPrice) {
      this.chartColor[0].borderColor = 'rgb(0,200,7)';
    } else if (todayPrice < yesterdayPrice) {
      this.chartColor[0].borderColor = 'rgb(255,80,0)';
    }
  }


  public computeData(): void {
    this.chartData[0].data = this.stock.price.slice(this.stock.price.length - 10);

    const transformedDates = [];

    for (const i of this.stock.closeDate) {
      transformedDates.push(this.datePipe.transform(i, 'MM-dd'));
    }

    this.chartLabels = transformedDates.slice(transformedDates.length - 10);
  }

  public buyStock(stockShares): void {
    let currencyBalance;
    const currency = 'DOLLAR';

    this.investmentServiceApi.getCurrencyBalance(this.UID, currency).then(data => {
      currencyBalance = data;
      const purchaseAmount = stockShares * this.stock.price[this.stock.price.length - 1];
      if (currencyBalance < purchaseAmount) {

      } else {
        this.investmentApi.removeBaseCurrency(this.UID, currency, -purchaseAmount, this.todayString);
        this.investmentApi.buyInvestment(this.UID, this.stock.stockName,
          this.stock.symbol, this.stock.price[this.stock.price.length - 1],
          stockShares, 'b', 'Stock', this.todayString);
      }
    });
  }


  public sellStock(stockShares): void {
    let numberShares;
    const currency = 'DOLLAR';

    this.investmentServiceApi.numberOfShares(this.UID, this.stock.symbol).then(data => {
      numberShares = data;
      const sellAmount = stockShares * this.stock.price[this.stock.price.length - 1];
      if (stockShares > numberShares) {

      } else {
        this.investmentApi.addBaseCurrency(this.UID, currency, sellAmount, this.todayString);
        this.investmentApi.sellInvestment(this.UID,
          this.stock.stockName, this.stock.symbol,
          this.stock.price[this.stock.price.length - 1],
          -Math.abs(stockShares),
          's', 'Stock', this.todayString);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('stock_ticker')) {
        this.isLoading = true;
        this.stockTicker = paramMap.get('stock_ticker');
        this.stocksService.getOneStock(this.stockTicker).subscribe(stockData => {
          this.stock = {
            stockName: stockData.stockName,
            symbol: stockData.symbol,
            price: stockData.price,
            marketCap: stockData.marketCap,
            closeDate: stockData.closeDate,
            pERatio: stockData.pERatio
          };
          this.changeAnnotation(this.stock.price[this.stock.price.length - 9]);
          this.changeLineColor(this.stock.price[this.stock.price.length - 10], this.stock.price[this.stock.price.length - 1]);
          this.computeData();
        });
        this.stocksService.getOneCompany(this.stockTicker).subscribe(companyData => {
          this.company = {
            companySummary: companyData.companySummary,
            companyCountry: companyData.companyCountry,
            companyCurrency: companyData.companyCurrency
          };
          this.isLoading = false;
        });
      }
    });
  }
}
