import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { WeatherGraphComponent } from './weather-graph/weather-graph.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherGraphComponent,
    WeatherTableComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, 
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, 
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
