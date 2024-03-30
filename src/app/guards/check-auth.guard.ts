import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const checkAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackBar = inject(MatSnackBar);
  if (!authService.isUserLoggedIn()) {
    snackBar.open(
      'You are not allowed to view this page. You are redirected to login Page',
      'OK'
    );
    router.navigate([{ outlets: { primary: 'login', contenu: null } }]);
    return false;
  }
  return true;
};
