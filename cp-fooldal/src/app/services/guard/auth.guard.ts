import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getMe().pipe(
      map(user => {
        if (user) {
          return true; // A felhasználó be van jelentkezve, az útvonal betölthető
        } else {
          this.router.navigate(['/bejelentkezes']); // Nincs bejelentkezve, átirányítás a bejelentkező oldalra
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/bejelentkezes']); // Hiba esetén (pl. 401) is átirányítunk
        return [false];
      })
    );
  }
  
}