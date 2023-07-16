import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Bien } from '../entities/bien';
import { Observable } from 'rxjs';
import { Categoria } from '../entities/categoria';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  private urlEndPoint:string = 'http://localhost:8080/tecazuay/bien'
  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json' })
  
  constructor(private http: HttpClient) { }

  getBienes(): Observable<Bien[]>{
    return this.http.get<Bien[]>(this.urlEndPoint);
  }
  
  createBien(bien: Bien): Observable<Bien[]>{
    return this.http.post<Bien[]>(this.urlEndPoint, bien, {headers: this.httpHeaders});
  }

  getBien(id: any): Observable<Bien> {
    return this.http.get<Bien>(`${this.urlEndPoint}/${id}`)
  }

}
