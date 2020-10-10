import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent implements OnInit {

  headers: any;
  rows: any;

  constructor() {
    this.headers = ['test', 'pleaseWork'];

    this.rows =  [{
      ID : '1',
      Name : 'Rahul',
      Age : '21',
      Gender : 'Male',
      Country : 'India'
    },
      {
        ID : '2',
        Name : 'Ajay',
        Age : '25',
        Gender : 'Male',
        Country : 'India'
      }];
  }


  ngOnInit(): void {
  }

}


