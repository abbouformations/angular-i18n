import { CanActivateChildFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const tokenStorage = inject(TokenStorageService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  if (!tokenStorage.hasRole('ADMIN')) {
    snackBar.open(
      'You are not allowed to view this page. You are redirected to login Page',
      'OK'
    );
    router.navigate([{ outlets: { primary: 'login', contenu: null } }]);
    return false;
  } else return true;
};
