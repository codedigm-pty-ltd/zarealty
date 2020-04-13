import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSessionService } from '../core/auth-session.service';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoggedInCanActivateGuard implements CanActivate {

  private socialUser: SocialUser;

  constructor(public router: Router,
    private authSessionService: AuthSessionService) {
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authSessionService.getUser()) {
        this.router.navigate(['/']);
        return false;
      }

    return true;
  }

}
