import { Injectable } from '@angular/core';
import { Historial } from '../entities/historial';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private urlEndPoint:string = 'http://localhost:8080/tecazuay/historial';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getHistorial(): Observable<Historial[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Historial[])
    ); 
    //this.http.get<Historial[]>(this.urlEndPoint);
  }
  getHistorials(his_cod: number): Observable<Historial>{
    return this.http.get<Historial> (`${this.urlEndPoint}/${his_cod}`);
  }

}
