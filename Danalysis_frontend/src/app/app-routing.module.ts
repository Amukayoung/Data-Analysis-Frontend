import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { QuestionsComponent } from './questions/questions.component';
import { WorkersComponent } from './workers/workers.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component:HomepageComponent, pathMatch: 'full'},
  {path:'home', component:HomepageComponent},
  {path:'login', component:LoginComponent},
  { path: 'workers', component: WorkersComponent, canActivate: [AuthGuard] },
  {path:'questions', component:QuestionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
