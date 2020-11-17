import { Component, OnInit, Input, Output } from '@angular/core';
import { Country } from '../country.model';
import { RealEstateService } from '../realestate.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl} from '@angular/forms';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {DatePipe} from '@angular/common';
import * as pluginAnnotations from 'chartjs-plugin-annotation';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  countryName: string;
  country: Country;
  countryData: Country;
  

  constructor(
    public realEstateService: RealEstateService,
    public route: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

    

  
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('country_name')) {
        this.countryName = paramMap.get('country_name');
        this.realEstateService.getOneCountry(this.countryName).subscribe(countryData => {
          this.country = {
            countryName: countryData.countryName,
            capitalCity: countryData.capitalCity,
            population: countryData.population,
            urbanRent: countryData.urbanRent,
            ruralRent: countryData.ruralRent,
            urbanPE: countryData.urbanPE,
            ruralPE: countryData.ruralPE,
            interestRate: countryData.interestRate,
            debtGDP: countryData.debtGDP,
            inflation: countryData.inflation
          };
  })
    }});
  }
}
