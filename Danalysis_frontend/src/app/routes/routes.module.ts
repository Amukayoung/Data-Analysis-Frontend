import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AgePieChartComponent } from '../age-pie-chart/age-pie-chart.component';
import { RoutesComponent } from './routes.component';

@NgModule({
  declarations: [
    RoutesComponent,
    AgePieChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  
})
export class RoutesModule { }
