//Info on drop down menu found at
//https://blog.kevinchisholm.com/angular/get-value-selected-dropdown-menu-item/
//https://www.itsolutionstuff.com/post/angular-10-select-dropdown-example-tutorialexample.html

import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {ProfileService} from '../profile.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile-animalSelector',
  providers: [ProfileService],
  templateUrl: 'profile-animalSelector.component.html',
  styleUrls: ['profile-animalSelector.component.css']
})

export class ProfileAnimalSelectorComponent implements OnInit {

  animalList: any = ['', 'Bear', 'Bull'];
  selectedAnimal = '';
  isValidAnimal = false;
  showMessage = false;

  userAnimal;
  userName;

  constructor(private authService: AuthService, private profileService: ProfileService) {
    this.userAnimal = this.profileService.getAnimal(this.userName);
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
  }

  selectChangeHandler(event: any) {
    this.selectedAnimal = event.target.value;

    //Validating for future "validateChoice()" calls
    if (this.selectedAnimal != '' && this.selectedAnimal != this.userAnimal)
      this.isValidAnimal = true;
    else
      this.isValidAnimal = false;
  }

  updateAnimal() {
    if (!this.validateChoice())
      return;
    this.profileService.updateAnimal(this.userName, this.selectedAnimal);
  }

  validateChoice() {
    //Choose whether to display message or not
    if (this.isValidAnimal)
      this.showMessage = false;
    else
      this.showMessage = true;

    //Validate if the update request can go through or not
    return this.isValidAnimal;
  }
}
