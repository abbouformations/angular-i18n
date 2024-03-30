import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isClient = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'de', 'ar']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getTokenValue() != null)
      this.isLoggedIn = true;

    if (this.isLoggedIn) {
      this.isAdmin = <boolean>this.tokenStorageService.hasRole('ADMIN');
      this.isClient = <boolean>this.tokenStorageService.hasRole('CLIENT');
      this.username = <string>this.tokenStorageService.getUsername();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate([{ outlets: { primary: 'login', contenu: null } }]);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
