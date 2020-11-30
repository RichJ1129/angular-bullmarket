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

  email;
  animal;
  isSelectorVisible = false;
  isFeedVisible = false;

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.email = this.authService.getEmailID();
  };

  showSelector()
  {
      this.isSelectorVisible = true;
      this.isFeedVisible = false;
  }

  showFeed() {
      this.isFeedVisible = true;
      this.isSelectorVisible = false;
  }

  showPlay()
  {
      this.isSelectorVisible = false;
      this.isFeedVisible = false;
  }


  ngOnInit() {};
}
