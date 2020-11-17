import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Country} from './country.model';
import {environment} from '../../environments/environment';
import {Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
/*
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};*/
const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class RealEstateService {
    
    
    constructor(private http: HttpClient, private router: Router) {}

    getRealEstate() {
      console.log(this.http.get(backendURL + '/realestate'));
      return this.http.get(backendURL + '/realestate');
    }

    getOneCountry(countryName: string) {
      console.log("One Country ");
      console.log(countryName);
      console.log(backendURL + '/country/' + countryName);
        return this.http.get<Country>(backendURL + '/country/' + countryName);
      }

}
