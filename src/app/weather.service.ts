import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Main, CityWeather } from './models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  public getWeather(): Observable<CityWeather[]> {
    return this._http
      .get('http://api.openweathermap.org/data/2.5/group?id=2643743,2643745,2643773,2643776,2643783,2643788,2643797,2643919,2643937,2653941,4931972,4932049,4932165,4932214,4932328,4932388,4932587,4932757,4932823,6458923&units=metric&appid=194333f5b09188fbda8c4a3bbfea30b2')
      .pipe(map((b: any) => {
        return b.list.map((c: any) => {
          return {
            id: c.id,
            name: c.name,
            coord: c.coord,
            main: {
              temp: c.main.temp,
              pressure: c.main.pressure,
              humidity: c.main.humidity,
              temp_min: c.main.temp_min,
              temp_max: c.main.temp_max
            } as Main,
            dt: c.dt,
            wind: c.wind,
            clouds: c.clouds,
            weather: c.weather
          } as CityWeather;
        })
      }));
  }

}


