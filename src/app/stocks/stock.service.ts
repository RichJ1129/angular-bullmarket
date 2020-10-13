import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import { map } from "rxjs/operators";

import {environment} from '../../environments/environment';
import {StockData} from './stock.model';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class StockService {
}
