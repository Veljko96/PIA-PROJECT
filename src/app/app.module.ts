import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { TokenInterceptorService } from './token-interceptor.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CvComponent } from './cv/cv.component';
import { SearchComponent } from './search/search.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompanyComponent } from './company/company.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { SetTimeComponent } from './set-time/set-time.component';
import { CreateFairComponent } from './create-fair/create-fair.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { GuestComponent } from './guest/guest.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ChangePasswordComponent,
    CvComponent,
    SearchComponent,
    CompetitionComponent,
    CompanyComponent,
    CreateCompetitionComponent,
    MyCompetitionsComponent,
    MyApplicationsComponent,
    SetTimeComponent,
    CreateFairComponent,
    GuestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule
  ],
  providers: [AuthService, AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
