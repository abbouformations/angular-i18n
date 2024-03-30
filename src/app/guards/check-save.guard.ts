import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { EmpCreateComponent } from '../emp/emp-create/emp-create.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export const checkSaveGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const snackBar = inject(MatSnackBar);

  if (!(component as EmpCreateComponent).isSaved) {
    snackBar.open(
      'Attention, vous risquez de perdre les modifications!. Voulez vous continuer ?',
      'OK'
    );
    return false;
  } else return true;
};
