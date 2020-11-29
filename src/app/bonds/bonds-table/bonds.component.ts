import {Component, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Bond } from '../bond.model';
import { BondService } from '../bond.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-bonds-table',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondTableComponent implements AfterViewInit {

  BondData: any = [];
  dataSource: MatTableDataSource<Bond>;
  displayedColumns: any[] = ['countryName', 'interestRate', 'inflationRate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private bondApi: BondService) {
    this.bondApi.getBonds().subscribe(data => {
      this.BondData = data;
      this.dataSource = new MatTableDataSource<Bond>(this.BondData);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void{
  }
}
