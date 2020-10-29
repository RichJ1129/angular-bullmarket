import { Component, OnInit, Input, Output } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];
  // StockData: any = [];
  stock: Stock;
  // dataSource: MatTableDataSource<Stock>;
  private stockTicker: string;
  stockValue = new FormControl('');

  chartType = 'line';
  chartData: ChartDataSets[] =  [
    {data: [],  label: 'Stock Price', fill: false, lineTension: 0}
  ];
  chartLabels = [];

  options = {
    scales: {
      xAxes: [{
        // display: false,
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
    }
  };


  computeData(): void {
    this.chartData[0].data = this.stock.price;
    const transformedDates = [];

    for (const i of this.stock.closeDate){
      transformedDates.push(this.datePipe.transform(i, 'MM-dd'));
    }

    this.chartLabels = transformedDates;
  }

  constructor(
    public stocksService: StockService,
    public route: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

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
          this.computeData();
        });
      }
    });
  }
}
