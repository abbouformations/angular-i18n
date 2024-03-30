import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userLoggedIn = '';

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status === 'VALID') {
      console.log('username', this.form.get('username') as FormControl);
      this.authService
        .login(
          (this.form.get('username') as FormControl).value,
          (this.form.get('password') as FormControl).value
        )
        .subscribe({
          next: (data) => {
            this.tokenStorage.saveToken(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.userLoggedIn = <string>this.tokenStorage.getUsername();
            this.router.navigate([
              { outlets: { primary: 'navbar', contenu: 'welcome' } },
            ]);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          },
        });
    }
  }
}
