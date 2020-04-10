import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'codedigm-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

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
    alert(1);
     this.authService.signOut().then(data => {
       debugger;
       this.router.navigate(['/login']);
     });
   }
}
