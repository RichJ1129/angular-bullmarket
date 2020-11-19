import {Component, OnInit, Input, Output, ViewChild} from '@angular/core';
import { Country } from '../country.model';
import {FeatureCollection, RealEstateService, Marker} from '../realestate.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DxVectorMapComponent} from 'devextreme-angular';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import component from 'devextreme/core/component';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {
  @ViewChild(DxVectorMapComponent, { static: false }) vectorMap: DxVectorMapComponent;
  countryName: string;
  country: Country;
  countryData: Country;
  countryMap: FeatureCollection;
  countryCenter: Array<number>;
  markers: Marker[];
  capitalMarker: Marker[];

  constructor(
    public realEstateService: RealEstateService,
    public route: ActivatedRoute
  ) {
    this.markers = realEstateService.getMarkers();
  }

  customizeCoordinates(countryName: string): void {
    for (const country of mapsData.world.features) {
      if (countryName === country.properties.name) {
        this.countryMap = this.realEstateService.getCountryBorders(countryName, country.geometry.coordinates);
      }
    }
  }

  customizeTooltip(arg): { text: any } {
    if (arg.layer.type === 'marker') {
      return {
        text: arg.attribute('name')
      };
    }
  }

  findCountryCenter(countryCapital: string): void {
    for (const capital of this.markers){
      if (capital.attributes.name === countryCapital) {
        this.countryCenter = capital.coordinates;
        this.capitalMarker = [capital];
      }
    }
  }

  // tslint:disable-next-line:typedef
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
          this.customizeCoordinates(this.countryName);
          this.findCountryCenter(countryData.capitalCity);
        });
    }});
  }
}
