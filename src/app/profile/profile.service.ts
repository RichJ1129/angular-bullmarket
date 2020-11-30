import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {AuthService} from "../auth/auth.service";
import {AuthData} from "../auth/auth-data.model";
import {Subject} from "rxjs";
import {EventEmitter} from "events";

const backendURL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class ProfileService {



  // Get Current User data
  userEmail = this.authService.getEmailID();
  userName = this.authService.getUserName();
  userAnimal;
  dataToSend;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  //Call to user.js to update the user's animal
  public updateAnimal(userName: string, userAnimal: string) {
    this.dataToSend = {userName, userAnimal};
    return this.http.post<{message: string}>(backendURL + '/user/updateAnimal', this.dataToSend)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }

  //Call to user.js to update the user's animal name
  public updateAnimalName(userName: string, userAnimalName: string) {
    this.dataToSend = {userName, userAnimalName};
    return this.http.post<{message: string}>(backendURL + '/user/updateAnimalName', this.dataToSend)
      .subscribe((responseData) => {
        console.log(responseData.message);
      })
  }

  //Call to user.js to retrieve the user's animal
  public getAnimal() {
    return this.http.get(backendURL + '/user/getAnimal/' + this.userEmail)
  }

  //Call to user.js to retrieve the user's animal name
  public getAnimalName() {
    return this.http.get(backendURL + '/user/getAnimalName/' + this.userEmail)
  }

}
