import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Country } from '../country.model';
import { RealEstateService } from '../realestate.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-realestate-table',
  templateUrl: './realestate-table.component.html',
  styleUrls: ['./realestate-table.component.css']
})
export class RealEstateTableComponent implements AfterViewInit {

  displayedColumns: any[] = ['countryName', 'urbanRent', 'urbanPrice', 'ruralRent', 'ruralPrice'];
  RealEstateData: any = [];
  dataSource;
  //dataSource=REALESTATE_DATA;//MatTableDataSource<Country>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private realestateApi: RealEstateService) {
    this.realestateApi.getRealEstate().subscribe(data => {
      // console.log("RE FROM DB");
      // console.log(data);
      this.RealEstateData = data;

      for(var x=0; x<this.RealEstateData.length; x++){
        this.RealEstateData[x].ruralPrice = (12 * (this.RealEstateData[x].ruralPE * this.RealEstateData[x].ruralRent)).toFixed(2);
        this.RealEstateData[x].urbanPrice = (12 * (this.RealEstateData[x].urbanPE * this.RealEstateData[x].urbanRent)).toFixed(2);
      }

      this.dataSource = new MatTableDataSource<Country>(this.RealEstateData);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
  }

}
