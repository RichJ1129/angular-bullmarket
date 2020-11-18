import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Country} from './country.model';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {AuthData} from 'src/app/auth/auth-data.model';
/*
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};*/
const backendURL = environment.apiURL;


export class FeatureCollection {
  type: string;
  features: Feature[];
}

export class Feature {
  type: string;
  properties: FeatureProperty;
  geometry: FeatureGeometry;
}

export class FeatureProperty {
  name: string;
  color?: string;
}

export class FeatureGeometry {
  type: string;
  coordinates: number[][][];
}

const countryBorders: FeatureCollection = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      name: ''
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        []
      ]
    }
  }]
};

@Injectable({providedIn: 'root'})
export class RealEstateService {
  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  getRealEstate() {
    console.log(this.http.get(backendURL + '/realestate'));
    return this.http.get(backendURL + '/realestate');
  }

  // tslint:disable-next-line:typedef
  getOneCountry(countryName: string) {
    console.log('One Country ');
    console.log(countryName);
    console.log(backendURL + '/country/' + countryName);
    return this.http.get<Country>(backendURL + '/country/' + countryName);
  }

  // tslint:disable-next-line:typedef
  getCountryBorders(countryName: string, coordinates) {
    countryBorders.features[0].properties.name = countryName;
    countryBorders.features[0].geometry.coordinates = coordinates;
    return countryBorders;
  }
}


