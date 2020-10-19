import { Component, OnInit, OnDestroy } from '@angular/core';
import { Commodity } from '../commodity.model';
import { CommodityService } from '../commodity.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-commodities-table',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommodityTableComponent implements OnInit {

  CommodityData: any = [];
  dataSource: MatTableDataSource<Commodity>;
  displayedColumns: any[] = ['commodityName', 'symbol', 'etfPrice', 'commodityUnit'];

  constructor(private commodityApi: CommodityService) {
    this.commodityApi.getCommodities().subscribe(data => {
      this.CommodityData = data;
      this.dataSource = new MatTableDataSource<Commodity>(this.CommodityData);
    });
  }

  ngOnInit() {
  }
}
