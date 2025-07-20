import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Tus servicios personalizados
import { AnalyticsService } from './services/analytics.service';
import { SeoService } from './services/seo.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración del core de Angular
    provideZoneChangeDetection({
      eventCoalescing: true,
      runCoalescing: true, // Mejor rendimiento para eventos frecuentes
    }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Tus servicios personalizados (¡sin necesidad de providedIn!)
    AnalyticsService,
    SeoService,
  ],
};
