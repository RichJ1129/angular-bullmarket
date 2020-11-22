import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from './profile.service';
import {MatTableDataSource} from '@angular/material/table';
import { ProfileAnimalComponent} from './profile-animal/profile-animal.component';
import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/auth.service';
import {InvestmentService} from "../investment/investment.service";
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  userName;
  email;
  animal;
  isSelectorVisible = false;
  isFeedVisible = false;
  isPlayVisible = false;

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.userName = this.authService.getUserName();
    this.email = this.authService.getEmailID();
  };

  showSelector()
  {
      this.isSelectorVisible = true;
      this.isFeedVisible = false;
      this.isPlayVisible = false;
  }

  showFeed() {
      this.isFeedVisible = true;
      this.isPlayVisible = false;
      this.isSelectorVisible = false;
  }

  showPlay()
  {
      this.isPlayVisible = true;
      this.isSelectorVisible = false;
      this.isFeedVisible = false;
  }


  ngOnInit() {};
}
