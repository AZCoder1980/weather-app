import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { CityWeather } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _seriesData: Highcharts.SeriesOptionsType[];
  private _categoriesData: string[];
  private _weatherData: CityWeather[];
  private _subs: Subscription = new Subscription();

  constructor(private _weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscribeToWeatherObserver();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  get seriesData() {
    return this._seriesData;
  }

  get categoriesData() {
    return this._categoriesData;
  }

  get weatherData() {
    return this._weatherData;
  }

  private subscribeToWeatherObserver(): void {
    const obs = this._weatherService.getWeather();

    this._subs.add(obs.subscribe((weatherData: CityWeather[]) => {
      this._weatherData = weatherData;

      const graphData = weatherData.map(d => {
        return {
          name: d.name,
          temp: d.main.temp,
          mean: (d.main.temp_min + d.main.temp_max) / 2
        } as GraphData;
      });

      this.setCategoriesData(graphData);
      this.setSeriesData(graphData);
    }));
  }

  private setCategoriesData(graphData: GraphData[]): void {
    this._categoriesData = graphData.map((b: any) => b.name);
  }

  private setSeriesData(graphData: GraphData[]): void {
    this._seriesData = [{
      name: 'Temp (C)',
      data: graphData.map((b: any) => b.temp),
      type: 'column', index: 1
    },
    {
      name: 'Mean (C)',
      data: graphData.map((b: any) => b.mean),
      type: 'column', index: 2
    }];
  }
}

interface GraphData {
  name: string;
  temp: number;
  mean: number;
}
