import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {

  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() { }

  nextSessionStatus(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }
}
