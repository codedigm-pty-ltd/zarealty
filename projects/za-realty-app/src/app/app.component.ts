import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthStatusService } from './core/auth-status.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'codedigm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'za-realty-app';

  constructor(router: Router,
    private authStatusService: AuthStatusService,
    public authService: AuthService) {
      let isloggedIn = false;
      this.authService.authState.subscribe((socialuser) => {
        isloggedIn = (socialuser != null);
        this.authStatusService.nextSessionStatus(isloggedIn);
      });

    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event:NavigationStart) => {
        // You only receive NavigationStart events
        this.authStatusService.nextSessionStatus(true);
      });
    }
}
