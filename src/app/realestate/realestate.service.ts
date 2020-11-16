import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Country} from './country.model';
import {environment} from '../../environments/environment';
import {Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';


const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class RealEstateService {
    
    
    constructor(private http: HttpClient, private router: Router) {}

    getRealEstate() {
      console.log(this.http.get(backendURL + '/realestate'));
      return this.http.get(backendURL + '/realestate');
    }

    getOneCountry(countryName: string) {
        return this.http.get<{
            countryName: string,
            capitalCity: string,
            population: number,
            urbanRent: number,
            urbanPE: number,
            ruralRent: number,
            ruralPE: number,
            interestRate: number,
            debtGDP: number,
            inflation: number
        }>(backendURL + '/country-page/' + countryName);
      }

}