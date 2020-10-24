import { Component, OnInit } from '@angular/core';
import { Stock } from '../stock.model';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  StockData: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
