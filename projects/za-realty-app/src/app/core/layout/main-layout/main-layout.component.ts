import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router, NavigationEnd } from '@angular/router';
import { AuthSessionService } from '../../auth-session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'codedigm-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  hideSpinner: boolean = false;
  socialUser: SocialUser | null;
  isloggedIn: boolean;
  signOut$: Observable<any>;

  constructor(public authService: AuthService,
              private router: Router,
              private authSessionService: AuthSessionService) { }

  ngOnInit(): void {
    this.authSessionService.socialUser$.subscribe(socialUser => {
      this.socialUser = socialUser;
      this.isloggedIn = this.socialUser != null;
    });
  }

  logout() {
     this.signOut$ = this.authSessionService.signOut();
     this.signOut$.subscribe(data => {
      this.authSessionService.onChanged();
      this.router.navigate(['/login']);
     });
   }

   ngAfterViewInit(){
     var that = this;
     //TODO: remove timeout once we call a real backend. This is just for simulation purposes.
     setInterval(function () {
      that.hideSpinner = true;
     }, 2000);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0,0);
        });
      }
    });
  }
}
