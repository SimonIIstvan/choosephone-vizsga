import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Telephone } from '../models/telephone.model';
import { TermekSzuro } from '../models/termek-szuro.model';

@Injectable({
  providedIn: 'root',
})
export class TelephonesService {
  private selectedTelephoneSubject = new BehaviorSubject<Telephone | null>(null);
  selectedTelephone$ = this.selectedTelephoneSubject.asObservable();
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllTelephones(): Observable<Telephone[]> {
    return this.http.get<Telephone[]>(`${this.apiUrl}/telephones`);
  }

  getTelephoneById(id: number): Observable<Telephone> {
    return this.http.get<Telephone>(`${this.apiUrl}/telephones/${id}`);
  }

  getTelephones(filter: TermekSzuro): Observable<Telephone[]> {
    let params = new HttpParams();

    if (filter.minAr) {
      params = params.set('minAr', filter.minAr.toString());
    }
    if (filter.maxAr) {
      params = params.set('maxAr', filter.maxAr.toString());
    }

    if (filter.minMegjelenesEv) {
      params = params.set('minMegjelenesEv', filter.minMegjelenesEv.toString());
    }
    if (filter.maxMegjelenesEv) {
      params = params.set('maxMegjelenesEv', filter.maxMegjelenesEv.toString());
    }

    if (filter.ram) {
      filter.ram.forEach((ram) => {
        params = params.append('ram', ram.toString());
      });
    }

    if (filter.markak) {
      filter.markak.forEach((marka) => {
        params = params.append('markak', marka);
      });
    }

    if (filter.tarhely) {
      filter.tarhely.forEach((tarhely) => {
        params = params.append('tarhely', tarhely.toString());
      });
    }

    if (filter.magok) {
      filter.magok.forEach((mag) => {
        params = params.append('magok', mag.toString());
      });
    }

    if (filter.operaciosRendszer) {
      params = params.append('operaciosRendszer', filter.operaciosRendszer);
    }
    
    return this.http.get<Telephone[]>(`${this.apiUrl}/telephones`, { params });
  }

  setSelectedTelephone(telephone: Telephone) {
    this.selectedTelephoneSubject.next(telephone);
  }
  
}
