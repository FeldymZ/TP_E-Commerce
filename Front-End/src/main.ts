import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  // C'est ici qu'on injecte HttpClientModule globalement
  ]
}).catch(err => console.error(err));
