import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { SocialloginService } from './shared/social-login.service';

@Component({
  selector: 'codedigm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private response: any;
  private socialuser: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService,
    private socialLoginService: SocialloginService,
    private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((socialuser) => {
      this.socialuser = socialuser;
      this.loggedIn = (socialuser != null);
    });
  }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider: string = "";
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers);
      //this.Savesresponse(socialusers);
      localStorage.setItem('socialUser', JSON.stringify( this.socialuser));
      console.log(localStorage.setItem('socialUser', JSON.stringify(this.socialuser)));
      this.router.navigate(['/home']);
    });
  }


  Savesresponse(socialUser: SocialUser) {
    this.socialLoginService.Savesresponse(socialUser).subscribe((response: any) => {
      debugger;
      console.log(response);
      this.socialuser=response;
      this.response = response.userDetail;
      localStorage.setItem('socialUser', JSON.stringify( this.socialuser));
      console.log(localStorage.setItem('socialUser', JSON.stringify(this.socialuser)));
      this.router.navigate(['/home']);
    })
  }
}
