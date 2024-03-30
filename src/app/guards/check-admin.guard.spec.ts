import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkAdminGuard } from './check-admin.guard';

describe('checkAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => checkAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
