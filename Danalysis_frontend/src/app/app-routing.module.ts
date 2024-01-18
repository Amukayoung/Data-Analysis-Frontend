import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuestionsComponent } from './questions/questions.component';
import { WorkersComponent } from './workers/workers.component';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component:HomepageComponent},
  {path:'workers', component:WorkersComponent},
  {path:'questions', component:QuestionsComponent},
  {path:'routes', component:RoutesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
