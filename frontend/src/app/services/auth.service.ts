import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}