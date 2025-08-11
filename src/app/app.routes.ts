import { Routes } from '@angular/router';
import { HomeComponent } from './MyComponent/home'; 
import { LoginComponent } from './MyComponent/login/login';
import { SignUpComponent } from './MyComponent/signup';
import { OtpComponent } from './MyComponent/otp/otp';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'otp', component: OtpComponent }

];
