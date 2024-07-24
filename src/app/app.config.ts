import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Eye, EyeOff, LogIn, LucideAngularModule } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({ LogIn, Eye, EyeOff })
    ),
    provideHttpClient()
  ],
};
