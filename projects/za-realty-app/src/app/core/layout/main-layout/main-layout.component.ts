import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'codedigm-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  hideSpinner: boolean = false;
  socialUser = new SocialUser();
  loggedIn: boolean;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    let socialUserJson = localStorage.getItem('socialUser') as string;
    this.loggedIn = (socialUserJson != null);

    if (socialUserJson != null) {
      this.socialUser = JSON.parse(socialUserJson);
    }
  }

  logout() {
     localStorage.removeItem('socialUser');
     this.authService.signOut().then(data => {
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
