import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const tokenService = inject(TokenStorageService);
  if (!tokenService.hasRole('ADMIN')) {
    snackBar.open(
      'You are not allowed to view this page. You are redirected to login Page',
      'OK'
    );
    router.navigate([{ outlets: { primary: 'login', contenu: null } }]);
    return false;
  }
  return true;
};
