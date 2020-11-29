import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Currency } from '../currency.model';
import { CurrencyService } from '../currency.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements AfterViewInit {

  displayedColumns: any[] = ['currencyName', 'ticker', 'rates'];
  CurrencyData: any = [];
  dataSource: MatTableDataSource<Currency>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private currencyApi: CurrencyService) {
    this.currencyApi.getCurrency().subscribe(data => {
      this.CurrencyData = data;
      this.dataSource = new MatTableDataSource<Currency>(this.CurrencyData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
  }

}
