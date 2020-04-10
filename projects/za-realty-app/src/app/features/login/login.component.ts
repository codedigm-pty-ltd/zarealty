import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { SocialloginService } from './shared/social-login.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthStatusService } from '../../core/auth-status.service';

@Component({
  selector: 'codedigm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  private response: any;
  private socialuser: SocialUser;
  private isloggedIn: boolean;

  constructor(private authService: AuthService,
    private socialLoginService: SocialloginService,
    private router: Router,
    public fb: FormBuilder,
    private authStatusService: AuthStatusService) { }

  ngOnInit() {
    this.authStatusService.isLoggedIn$.subscribe(isloggedIn => this.isloggedIn = isloggedIn);

    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });

    this.authService.authState.subscribe((socialuser) => {
      this.socialuser = socialuser;
      this.isloggedIn = (socialuser != null);
      this.authStatusService.nextSessionStatus(this.isloggedIn);
    });
  }

  //non social media login
  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
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
