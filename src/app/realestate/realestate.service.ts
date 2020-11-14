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


}