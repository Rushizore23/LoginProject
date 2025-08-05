import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // adjust if needed
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './app/services/auth';




  



//bootstrapApplication(App, appConfig)
//  .catch((err) => console.error(err));

/*bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi()), AuthService]
});*/

bootstrapApplication(App, {
  providers: [provideHttpClient(), ...appConfig.providers]
}).catch(err => console.error(err));


