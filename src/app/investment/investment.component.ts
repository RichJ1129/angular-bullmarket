import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment } from './investment.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() { }

};