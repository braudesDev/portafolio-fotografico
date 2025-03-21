import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient } from '@angular/common/http'; //Nueva forma de configurar HttpClientModule

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
  provideHttpClient()
]
}).catch(err => console.error(err));
