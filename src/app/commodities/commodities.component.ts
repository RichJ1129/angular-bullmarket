import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface People {
  name: string;
  age: number;
  gender: string;
  country: string;
}

const PEOPLE_DATA: People[] = [
  {
    name : 'Rahul',
    age : 21,
    gender : 'Male',
    country : 'India'
  },
  {
    name : 'Ajay',
    age : 25,
    gender : 'Male',
    country : 'India'
  }
];

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent {
  displayedColumns: string[] = ['name', 'age', 'gender', 'country'];
  dataSource = PEOPLE_DATA;
}



