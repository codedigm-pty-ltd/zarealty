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

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    let socialUserJson = localStorage.getItem('socialUser') as string;
    if (socialUserJson == null) {
      this.socialUser.name = "Barry";
    }
    // this.socialUser = JSON.parse(socialUserJson);
    // console.log(this.socialUser.photoUrl);
  }

  logout() {
    alert(1);
     this.authService.signOut().then(data => {
       debugger;
       this.router.navigate(['/login']);
     });
   }
}
