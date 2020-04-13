import { Injectable } from '@angular/core';
import { Subject, from, of } from 'rxjs';
import { SocialUser, AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { ObservableStore } from '@codewithdan/observable-store'
import { AuthSessionActions } from '../features/login/shared/store-actions.model';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  private socialUser = new Subject<SocialUser>();
  socialUser$ = this.socialUser.asObservable();

  constructor(private authService: AuthService,
    private secureStorageService: SecureStorageService) {
   }

  signIn(providerId: string) {
    const socialUser = this.secureStorageService.getState<SocialUser>(AuthSessionActions.GetSocialUser);
    if (socialUser) {
      console.log(JSON.stringify(socialUser));
      return of(socialUser);
    } else {
     return this.socialSignIn(providerId);
    }
  }

  signOut() {
    return from(this.authService.signOut())
      .pipe(map(data => {
        this.secureStorageService.removeState(AuthSessionActions.GetSocialUser);
        return data;
      }));
  }

  private socialSignIn(providerId: string) {
    let socialPlatformProvider: string = this.getSocialProvider(providerId);
    return from(this.authService.signIn(socialPlatformProvider))
    .pipe(map(socialUser => {
      this.secureStorageService.setState(AuthSessionActions.GetSocialUser, socialUser);
      return socialUser;
    }));
  }

  private getSocialProvider(providerId: string) {
    if (providerId === 'facebook') {
      return FacebookLoginProvider.PROVIDER_ID;
    } else if (providerId === 'google') {
      return GoogleLoginProvider.PROVIDER_ID;
    }

    return "";
  }

  getUser() : SocialUser | null {
    return this.secureStorageService.getState<SocialUser>(AuthSessionActions.GetSocialUser);
  }

  onChanged() {
    let socialUser = this.getUser() as SocialUser;
    this.socialUser.next(socialUser);
  }
}
