import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCanLoadGuard implements CanLoad {

  constructor(public router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      let socialUserJson = localStorage.getItem('socialUser') as string;

      if (socialUserJson == null) {
        this.router.navigate(['login']);
        return false;
      }

    return true;
  }
}
