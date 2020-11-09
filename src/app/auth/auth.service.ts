import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {AuthData} from './auth-data.model';
import {environment} from '../../environments/environment';

const backendURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private emailID: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return this.token;
  }
  // tslint:disable-next-line:typedef
  getIsAuth() {
    return this.isAuthenticated;
  }
  // tslint:disable-next-line:typedef
  getEmailID() {
    return this.getAuthData().emailID;
  }
  // tslint:disable-next-line:typedef
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // tslint:disable-next-line:typedef
  createUser(userName: string, email: string) {
    const authData: AuthData = {userName, email};
    this.http.post(backendURL + '/user/signup', authData).subscribe(() => {
        this.router.navigate(['/']);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }

  // tslint:disable-next-line:typedef
  login(userName: string, email: string) {
    const authData: AuthData = {userName, email};
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        backendURL + '/user/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, authData.email);
          const data = this.getAuthData();
          this.router.navigate(['home']);
        }
      });
  }

  // tslint:disable-next-line:typedef
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.emailID = authInformation.emailID;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number): void {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email', email);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  // tslint:disable-next-line:typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const emailID = localStorage.getItem('email');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      emailID
    };
  }
}
