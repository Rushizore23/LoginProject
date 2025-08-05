import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './MyComponent/login/login';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, LoginComponent, RouterModule],
  //templateUrl: './app.html',
  styleUrl: './app.css',
  template: `<router-outlet></router-outlet>`

})
export class App {
  protected readonly title = signal('cwh-login');
  
}

