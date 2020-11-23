import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {environment} from '../../environments/environment';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class BondService {

  constructor(private http: HttpClient, private router: Router) {}

  // tslint:disable-next-line:typedef
  getBonds() {
    console.log(this.http.get(backendURL + '/bonds'));
    return this.http.get(backendURL + '/bonds');
  }
}
