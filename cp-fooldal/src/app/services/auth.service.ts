import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, { withCredentials: true }).pipe(
      tap(() => this.checkStatus())
        
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/logout`, { withCredentials: true });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password });
  }

  checkStatus(): void {
    this.http.get<{ loggedIn: boolean; user?: User }>(`${this.apiUrl}/auth/status`).pipe(
      tap(response => {
        this.loggedIn.next(response.loggedIn);
        this.user.next(response.user || null);
      })
    ).subscribe();
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, { withCredentials: true });
  }



}