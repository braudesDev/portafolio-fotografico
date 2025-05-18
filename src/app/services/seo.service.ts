import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'On Off Shot';
  private readonly baseUrl = environment.production
    ? 'https://onoffshot.com'
    : 'https://portafolio-fotografico-15a5b.web.app';
  private readonly defaultImage = `${this.baseUrl}/assets/images/og-default.jpg`;

  constructor(private title: Title, private meta: Meta) {}

  setSeoData(config: {
    pageTitle: string;
    description: string;
    keywords?: string;
    image?: string;
    urlPath?: string;
  }): void {
    const fullTitle = `${this.siteName} | ${config.pageTitle}`;
    const pageUrl = config.urlPath ? `${this.baseUrl}/${config.urlPath}` : this.baseUrl;
    const imageUrl = config.image ? `${this.baseUrl}/${config.image}` : this.defaultImage;

    this.title.setTitle(fullTitle);
    this.updateBasicTags(config.description, config.keywords);
    this.updateSocialTags({
      title: fullTitle,
      description: config.description,
      image: imageUrl,
      url: pageUrl
    });
    this.meta.updateTag({ rel: 'canonical', href: pageUrl });
  }

  private updateBasicTags(description: string, keywords?: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  private updateSocialTags(config: {
    title: string;
    description: string;
    image: string;
    url: string;
  }): void {
    const tags = [
      { type: 'property', key: 'og:title', value: config.title },
      { type: 'property', key: 'og:description', value: config.description },
      { type: 'property', key: 'og:image', value: config.image },
      { type: 'property', key: 'og:url', value: config.url },
      { type: 'property', key: 'og:type', value: 'website' },
      { type: 'property', key: 'og:site_name', value: this.siteName },
      { type: 'name', key: 'twitter:card', value: 'summary_large_image' },
      { type: 'name', key: 'twitter:title', value: config.title },
      { type: 'name', key: 'twitter:description', value: config.description },
      { type: 'name', key: 'twitter:image', value: config.image }
    ];

    tags.forEach(tag => {
      if (tag.type === 'property') {
        this.meta.updateTag({ property: tag.key, content: tag.value });
      } else {
        this.meta.updateTag({ name: tag.key, content: tag.value });
      }
    });
  }
}
