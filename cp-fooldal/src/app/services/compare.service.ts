import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  private apiUrl = 'http://localhost:3000';
  private compareItemsSubject = new BehaviorSubject<any[]>([]);
  compareItems$ = this.compareItemsSubject.asObservable();


  constructor(private http: HttpClient) { }


  loadCompare() {
    this.http.get<any[]>(`${this.apiUrl}/compare`).subscribe((data) => {
      this.compareItemsSubject.next(data); // Frissíti a kosár tartalmát
    });
  }

  getCompare(): Observable<any> {
    return this.compareItems$;
  }

  addToCompare(telephoneId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/compare`, { telephoneId }).pipe(
      tap(() => this.loadCompare()) // Frissíti a kosarat a hozzáadás után
    );
  }

  removeFromCompare(telephoneId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compare/${telephoneId}`).pipe(
      tap(() => this.loadCompare())
    );
  }
}
