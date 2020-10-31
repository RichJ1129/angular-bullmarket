import { Component, OnInit, Input, Output } from '@angular/core';
import { Stock, Company } from '../stock.model';
import { StockService } from '../stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';
import * as pluginAnnotations from 'chartjs-plugin-annotation';



@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  constructor(
    public stocksService: StockService,
    public route: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

  show = false;

  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];
  stock: Stock;
  company: { companyCurrency: string; companySummary: string; companyCountry: string };
  private stockTicker: string;
  stockValue = new FormControl('');

  chartType = 'line';
  chartData: ChartDataSets[] =  [
    {data: [],  label: 'Stock Price', fill: false, lineTension: 0}
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
    if (todayPrice > yesterdayPrice){
      this.chartColor[0].borderColor = 'rgb(0,200,7)';
    }
    else if (todayPrice < yesterdayPrice) {
      this.chartColor[0].borderColor = 'rgb(255,80,0)';
    }
  }


  public computeData(): void {
    this.chartData[0].data = this.stock.price;
    const transformedDates = [];

    for (const i of this.stock.closeDate){
      transformedDates.push(this.datePipe.transform(i, 'MM-dd'));
    }

    this.chartLabels = transformedDates;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('stock_ticker')) {
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
          this.changeAnnotation(this.stock.price[this.stock.price.length - 2]);
          this.changeLineColor(this.stock.price[this.stock.price.length - 2], this.stock.price[this.stock.price.length - 1]);
          this.computeData();
        });
        this.stocksService.getOneCompany(this.stockTicker).subscribe(companyData => {
          this.company = {
            companySummary: companyData.companySummary,
            companyCountry: companyData.companyCountry,
            companyCurrency: companyData.companyCurrency
         };
        });
      }
    });
  }
}
