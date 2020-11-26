import { Component, OnInit, Input, Output } from '@angular/core';
import { Commodity } from '../commodity.model';
import { CommodityService } from '../commodity.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {DatePipe} from '@angular/common';
import {FormControl} from '@angular/forms';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-commodities-page',
  templateUrl: './commodities-page.component.html',
  styleUrls: ['./commodities-page.component.css']
})
export class CommoditiesPageComponent implements OnInit {

  constructor(
    public commodityService: CommodityService,
    public route: ActivatedRoute,
    public datePipe: DatePipe
  ) {}

  show = false;

  displayedColumns: any[] = ['commodityName', 'symbol', 'etfPrice'];
  commodity: Commodity;
  private commoditySymbol: string;
  commodityValue = new FormControl('');
  chartType = 'line';
  chartData: ChartDataSets[] =  [
    {data: [], label: 'All Commodity Prices', fill: false, lineTension: 0},
  ];

  chartLabels = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          display: false
        }
      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 5,
          borderColor: 'grey',
          borderWidth: 2,
          borderDash: [4, 4],
          label: {
            enabled: false,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        }]
    }
  };

  chartColor = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

  public lineChartPlugins = [pluginAnnotations];

  public changeAnnotation(commodityRate): void {
    this.lineChartOptions.annotation.annotations[0].value = commodityRate;
  }

  public changeLineColor(yesterdayPrice, todayPrice): void {
    if (todayPrice > yesterdayPrice){
      this.chartColor[0].borderColor = 'rgb(0,200,7)';
    }
    else if (todayPrice < yesterdayPrice) {
      this.chartColor[0].borderColor = 'rgb(255,80,0)';
    }
  }


  public computeData(): void {
    this.chartData[0].data = this.commodity.etfPrice;

    const transformedDates = [];
    console.log(this.commodity.closeDate);

    for (const i of this.commodity.closeDate){
      transformedDates.push(this.datePipe.transform(i, 'MM-dd'));
    }

    this.chartLabels = transformedDates;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commodity_symbol')) {
        this.commoditySymbol = paramMap.get('commodity_symbol');
        this.commodityService.getOneCommodity(this.commoditySymbol).subscribe(commodityData => {
          this.commodity = {
            commodityName: commodityData.commodityName,
            symbol: commodityData.symbol,
            etfPrice: commodityData.etfPrice,
            commodityUnit: commodityData.commodityUnit,
            closeDate: commodityData.closeDate
          };
          this.changeAnnotation(this.commodity.etfPrice[this.commodity.etfPrice.length - 1]);
          // tslint:disable-next-line:max-line-length
          this.changeLineColor(this.commodity.etfPrice[this.commodity.etfPrice.length - 2], this.commodity.etfPrice[this.commodity.etfPrice.length - 1]);
          this.computeData();
        });
      }
    });
  }

}
