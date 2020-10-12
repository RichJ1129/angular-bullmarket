import {OnInit} from '@angular/core';
import {ViewChild, Component} from '@angular/core';
import {DxVectorMapComponent} from 'devextreme-angular';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import {Service} from './home.service';

@Component({
  selector: 'app-home',
  providers: [Service],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  worldMap: any = mapsData.world;
  gdp: Object;

  constructor(service: Service) {
    this.gdp = service.getGDP();
    this.customizeLayers = this.customizeLayers.bind(this);
  }

  customizeTooltip(arg) {
    if (arg.attribute('gdp')) {
      return {
        text: arg.attribute('name') + ': ' + arg.attribute('gdp') / 1000 + 'B GDP'
      };
    }
  }

  customizeLayers(elements) {
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

  ngOnInit(): void {
  }

}
