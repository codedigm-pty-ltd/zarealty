import { TestBed } from '@angular/core/testing';

import { LoggedInCanActivateGuard } from './logged-in.can-activate.guard';

describe('LoggedInCanActivateGuard', () => {
  let guard: LoggedInCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
