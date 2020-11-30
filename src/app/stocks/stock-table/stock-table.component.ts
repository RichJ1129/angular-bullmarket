import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Stock } from '../stock.model';
import { StockService } from '../stock.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.css']
})
export class StockTableComponent implements AfterViewInit {

  displayedColumns: any[] = ['stockName', 'symbol', 'price', 'pERatio', 'marketCap'];
  StockData: any = [];
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private stockApi: StockService) {
    this.stockApi.getStocks().subscribe(data => {
      this.StockData = data;
      this.dataSource = new MatTableDataSource<Stock>(this.StockData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
  }
}
