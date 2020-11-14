import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Country } from '../country.model';
import { RealEstateService } from '../realestate.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const REALESTATE_DATA: Country[] = [
  {
    countryName: 'Afghanistan',
    capitalCity: 'Kabul',
    population: 32000000,
    urbanRent: 133.11,
    urbanPE: 27.15,
    ruralRent: 71.34,
    ruralPE: 23.16,
    interestRate: 15,
    debtGDP: 7,
    inflation: 6.3,
    bondPE: 6.7
  },
  {
    countryName: 'Albania',
    capitalCity: 'Tirana',
    population: 3000000,
    urbanRent: 305.74,
    urbanPE: 23.84,
    ruralRent: 186.20,
    ruralPE: 19.25,
    interestRate: 0.50,
    debtGDP: 64,
    inflation: 1.3,
    bondPE: 200
  }
];



@Component({
  selector: 'app-realestate-table',
  templateUrl: './realestate-table.component.html',
  styleUrls: ['./realestate-table.component.css']
})
export class RealEstateTableComponent implements OnInit {

  displayedColumns: any[] = ['countryName', 'urbanRent', 'urbanPrice', 'ruralRent', 'ruralPrice'];
  RealEstateData: any = [];
  dataSource=REALESTATE_DATA;//MatTableDataSource<Country>;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private realestateApi: RealEstateService) {
  }

  ngOnInit(): void {
  }

}
