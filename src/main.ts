import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  const iconField = <HTMLInputElement>document.getElementById('tabIcon');
  iconField.setAttribute('href', '/assets/tko-logo.jpg');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
