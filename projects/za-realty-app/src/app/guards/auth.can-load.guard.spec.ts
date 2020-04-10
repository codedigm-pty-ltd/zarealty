import { TestBed } from '@angular/core/testing';

import { AuthCanLoadGuard } from './auth.can-load.guard';

describe('Auth.CanLoadGuard', () => {
  let guard: AuthCanLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCanLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
