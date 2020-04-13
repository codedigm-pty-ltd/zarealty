import { Component, OnInit } from '@angular/core';
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { SocialloginService } from './shared/social-login.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthSessionService } from '../../core/auth-session.service';

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

  constructor(
    private socialLoginService: SocialloginService,
    private router: Router,
    public fb: FormBuilder,
    private authSessionService: AuthSessionService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  //non social media login
  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.router.navigate(['/']);
    }
  }

  public socialSignIn(socialProvider: string) {
    this.authSessionService
        .signIn(socialProvider)
        .subscribe(socialUser => {
          this.router.navigate(['/']);
        });
  }

  //TODO: complete this later.
  Savesresponse(socialUser: SocialUser) {
    this.socialLoginService.Savesresponse(socialUser).subscribe((response: any) => {
      debugger;
      console.log(response);
      this.socialuser=response;
      this.response = response.userDetail;

      this.router.navigate(['/home']);
    })
  }
}
