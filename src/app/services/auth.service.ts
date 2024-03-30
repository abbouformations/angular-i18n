import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:9090/auth/signin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, { username, password }, httpOptions);
  }

  isUserLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }
}
