import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Currency } from '../currency.model';
import { CurrencyService } from '../currency.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {

  displayedColumns: any[] = ['currencyName', 'ticker', 'rates'];
  CurrencyData: any = [];
  dataSource: MatTableDataSource<Currency>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private currencyApi: CurrencyService) {
    this.currencyApi.getCurrency().subscribe(data => {
      this.CurrencyData = data;
      this.dataSource = new MatTableDataSource<Currency>(this.CurrencyData);
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }

}
