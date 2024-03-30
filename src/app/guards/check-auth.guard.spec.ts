import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkAuthGuard } from './check-auth.guard';

describe('checkAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
