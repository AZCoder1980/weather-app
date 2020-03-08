import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.scss']
})
export class WeatherGraphComponent implements OnInit {
  @Input() seriesData: Highcharts.SeriesOptionsType[];
  @Input() categoriesData: string[];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor() { }

  ngOnInit() {
    this.initialiseChart();
  }

  private initialiseChart(): void {
    this.chartOptions = {
      chart: { type: 'column' },
      title: {
        text: 'City Temperatures'
      },
      subtitle: {
        text: 'Source: OpenWeather'
      },
      xAxis: {
        categories: this.categoriesData
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Temp (C)'
        }
      },
      series: this.seriesData
    };
  }

}
