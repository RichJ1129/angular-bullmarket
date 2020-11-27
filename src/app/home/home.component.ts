import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';
import { DxVectorMapModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';


import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {Service} from './home.service';
import {ProfileService} from '../profile/profile.service';

@Component({
  selector: 'app-home',
  providers: [Service],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  worldMap: any = mapsData.world;
  gdp: Object;
  animalDecider;
  selectedCountry: string;
  @ViewChild(DxVectorMapComponent, { static: false }) vectorMap: DxVectorMapComponent;


  constructor(service: Service,
              private profileService: ProfileService,
              private router: Router) {
    this.gdp = service.getGDP();
    this.customizeLayers = this.customizeLayers.bind(this);
    this.profileService.getAnimal()
      .subscribe(val => {this.animalDecider = val;
      });
  }

  onClick(e): void {
    const target = e.target;

    if (target && this.gdp[target.attribute('name')] && target.attribute('name') !== 'Greenland') {
      this.router.navigate(['/country/' + target.attribute('name')]);
    }
  }

  customizeTooltip(arg): { text: string } {
    // console.log(arg.attribute('name'));
    if (arg.attribute('gdp')) {
      return {
        text: arg.attribute('name') + ': ' + arg.attribute('gdp') / 1000 + 'B GDP'
      };
    }
  }

  customizeLayers(elements): void {
    elements.forEach((element) => {
      element.attribute('gdp', this.gdp[element.attribute('name')]);
    });
  }

  // customizeText(arg) {
  //   let text;
  //   if(arg.index === 0) {
  //     text = '< 0.5%';
  //   } else if(arg.index === 5) {
  //     text = '> 3%';
  //   } else {
  //     text = arg.start + '% to ' + arg.end + '%';
  //   }
  //   return text;
  // }

  // constructor() { }

  ngOnInit(): void { }

}
