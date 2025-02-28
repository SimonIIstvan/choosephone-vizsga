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

  getPhones(filters?: Partial<TermekSzuro>): Observable<Telephone[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.minAr) params = params.set('minAr', filters.minAr.toString());
      if (filters.maxAr) params = params.set('maxAr', filters.maxAr.toString());
      if (filters.ram && filters.ram.length > 0){
        filters.ram.forEach(ram => {
          params = params.append('ram', ram);
        })
      }
    }

    return this.http.get<Telephone[]>(`${this.apiUrl}/telephones`, { params });
  }
  
}
