import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CityWeather } from '../models';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements OnInit {
  @Input() weatherData: CityWeather[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'lon', 'lat', 'temp', 'pressure', 'humidity'
    , 'temp_min', 'temp_max', 'dt', 'speed', 'deg', 'all', 'w_id', 'w_main', 'w_description', 'w_icon'];

  private _dataSource: MatTableDataSource<CityWeather> = new MatTableDataSource();

  constructor() { }

  ngOnInit() {
    this.setTableDataSource();
  }

  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  applyFilter(filterValue: string) {
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setTableDataSource(): void {
    this._dataSource.data = this.weatherData;

    this._dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'lon': return item.coord.lon;
        case 'lat': return item.coord.lat;
        case 'temp': return item.main.temp;
        case 'pressure': return item.main.pressure;
        case 'humidity': return item.main.humidity;
        case 'temp_min': return item.main.temp_min;
        case 'temp_max': return item.main.temp_max;
        case 'speed': return item.wind.speed;
        case 'deg': return item.wind.deg;
        case 'all': return item.clouds.all;
        case 'w_id': return item.weather[0].id;
        case 'w_main': return item.weather[0].main;
        case 'w_description': return item.weather[0].description;
        case 'w_icon': return item.weather[0].icon;
        default: return item[property];
      }
    };

    this._dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.name.toLowerCase().includes(filter);
    };

    this._dataSource.paginator = this.paginator;
    this._dataSource.sort = this.sort;
  }

}
