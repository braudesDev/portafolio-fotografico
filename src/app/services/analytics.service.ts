import { Injectable } from '@angular/core';

declare const gtag: Function;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackEvent(eventName: string, params: {}) {
    gtag('event', eventName, params);
  }
}
