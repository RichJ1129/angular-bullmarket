import { Component, OnInit, Input, Output } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';



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

  // @Input() stock_profile = {};
  chartType = 'line';
  chartData: ChartDataSets[] = [
    {data: []}
  ];
  // newChart[] = [{data = [4, 8, 9, 10, 11, 12, 15, 12]}];
  chartLabels = [];

  computeData() {
    this.chartLabels = [this.stock.closeDate];
  }



  constructor(
    public stocksService: StockService,
    public route: ActivatedRoute
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
          console.log(typeof(this.chartData));
          console.log(this.chartLabels);
        });
      }
    });
  }
}
