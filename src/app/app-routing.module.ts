import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CvComponent } from './cv/cv.component';
import { SearchComponent } from './search/search.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompanyComponent } from './company/company.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { SetTimeComponent } from './set-time/set-time.component';
import { CreateFairComponent } from './create-fair/create-fair.component';
import { GuestComponent } from './guest/guest.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"change_password",
    component: ChangePasswordComponent
  },
  {
    path:"home",
    component: HomeComponent,
    canActivate:[AuthGuard]
    //condition for access
  },
  {
    path:"cv",
    component: CvComponent
  },
  {
    path:"search",
    component: SearchComponent
  },
  {
    path:"competition/:id",
    component: CompetitionComponent
  },
  {
    path:"company/:id",
    component: CompanyComponent
  },
  {
    path:"createCompetition",
    component: CreateCompetitionComponent
  },

  {
    path:"myCompetitions",
    component: MyCompetitionsComponent
  },
  {
    path:"myApplications",
    component: MyApplicationsComponent
  },
  {
    path:"setTime",
    component: SetTimeComponent
  },
  {
    path:"createFair",
    component: CreateFairComponent
  },
  {
    path:"guest",
    component: GuestComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 

}