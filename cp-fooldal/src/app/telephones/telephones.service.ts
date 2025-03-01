import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telephone } from '../models/telephone.model';
import { TermekSzuro } from '../models/termek-szuro.model';

@Injectable({
  providedIn: 'root',
})
export class TelephonesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllTelephones(): Observable<Telephone[]> {
    return this.http.get<Telephone[]>(`${this.apiUrl}/telephones`);
  }

  getTelephones(filter: TermekSzuro): Observable<Telephone[]> {
    let params = new HttpParams();

    if (filter.minAr) {
      params = params.set('minAr', filter.minAr.toString());
    }
    if (filter.maxAr) {
      params = params.set('maxAr', filter.maxAr.toString());
    }
    
    return this.http.get<Telephone[]>(`${this.apiUrl}/telephones`, { params });
  }
  
}
