import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomepageComponent},
  {path:'workers', component:HomepageComponent},
  {path:'questions', component:HomepageComponent},
  {path:'routes', component:RoutesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
