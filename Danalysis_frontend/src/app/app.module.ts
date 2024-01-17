import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkerBarChartComponent } from './worker-bar-chart/worker-bar-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutesPieChartComponent } from './routes-pie-chart/routes-pie-chart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuestionsComponent } from './questions/questions.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkerBarChartComponent,
    RoutesPieChartComponent,
    HomepageComponent,
    QuestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
