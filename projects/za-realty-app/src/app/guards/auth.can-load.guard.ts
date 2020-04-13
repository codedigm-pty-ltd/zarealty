import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthSessionService } from '../core/auth-session.service';
import { SocialUser } from 'angularx-social-login';
import { of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

  private socialUser: SocialUser;

  constructor(public router: Router,
    private authSessionService: AuthSessionService) {
    }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authSessionService.getUser()) {
        this.router.navigate(['login']);
        return false;
      }

    return true;
  }
}
