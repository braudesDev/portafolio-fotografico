// src/app/services/seo.service.ts
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
// import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private siteName = 'On Off Shot';

  constructor(private title: Title, private meta: Meta) {}

  setSeoData(config: {
    pageTitle: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
  }): void {
    const fullTitle = `${this.siteName} | ${config.pageTitle}`;
    // const pageUrl = config.url || window.location.href;
    // const defaultImage = `${environment.baseUrl}/assets/images/og-default.jpg`;

    // Título de la página
    this.title.setTitle(fullTitle);

    // Meta tags básicos
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }


    //Servicio de imagenes a utilizar ahora que tengamos un poco mas de tiempo

  //   // Open Graph (Facebook, LinkedIn)
  //   this.meta.updateTag({ property: 'og:title', content: fullTitle });
  //   this.meta.updateTag({ property: 'og:description', content: config.description });
  //   this.meta.updateTag({ property: 'og:image', content: config.image || defaultImage });
  //   this.meta.updateTag({ property: 'og:url', content: pageUrl });
  //   this.meta.updateTag({ property: 'og:type', content: 'website' });

  //   // Twitter Cards
  //   this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  //   this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
  //   this.meta.updateTag({ name: 'twitter:description', content: config.description });
  //   this.meta.updateTag({ name: 'twitter:image', content: config.image || defaultImage });
  // }
  }
}
