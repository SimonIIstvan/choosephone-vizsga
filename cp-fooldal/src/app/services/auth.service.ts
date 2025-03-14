import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {});
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password });
  }

  getStatus(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/status`).pipe(
      map((response: any) => response.loggedIn)
      
    );
  }
}