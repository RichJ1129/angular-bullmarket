import { Component, OnInit } from '@angular/core';

export interface Commodity {
  ticker: string;
  name: string;
  price: number;
  unit: string;
}

const COMMODITY_DATA: Commodity[] = [
  {
    ticker : 'GLD',
    name : 'GOLD',
    price : 183.42,
    unit : 'Troy Ounce'
  },
  {
    ticker : 'SLV',
    name : 'SILVER',
    price : 22.65,
    unit : 'Troy Ounce'
  }
];

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent {
  displayedColumns: string[] = ['ticker', 'name', 'price', 'unit'];
  dataSource = COMMODITY_DATA;
}



