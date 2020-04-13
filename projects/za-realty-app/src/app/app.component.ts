import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthSessionService } from './core/auth-session.service';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'codedigm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'za-realty-app';

  constructor(router: Router,
    private authSessionService: AuthSessionService) {

     router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        // You only receive NavigationStart events
        this.authSessionService.onChanged();
      });
    }
}
