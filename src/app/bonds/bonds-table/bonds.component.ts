import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bond } from '../bond.model';
import { BondService } from '../bond.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-bonds-table',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondTableComponent implements OnInit {

  BondData: any = [];
  dataSource: MatTableDataSource<Bond>;
  displayedColumns: any[] = ['countryName', 'interestRate', 'inflationRate'];

  constructor(private bondApi: BondService) {
    this.bondApi.getBonds().subscribe(data => {
      this.BondData = data;
      this.dataSource = new MatTableDataSource<Bond>(this.BondData);
    });
  }

  ngOnInit() {
  }
}
