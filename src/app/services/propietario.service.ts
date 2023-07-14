import { Injectable } from '@angular/core';
import { Propietario } from '../entities/propietario';
import { Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private urlEndPoint:string = 'http://localhost:8080/tecazuay/propietarios';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getPropietarios(): Observable<Propietario[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Propietario[])
    ); 
    //this.http.get<Propietario[]>(this.urlEndPoint);
  }
  
  create(propietario:Propietario): Observable<Propietario>{
    return this.http.post<Propietario>(this.urlEndPoint, propietario, {headers: this.httpHeaders})
  }

  getPropietario(pro_cod:number):Observable<Propietario>{
    return this.http.get<Propietario>(`${this.urlEndPoint}/${pro_cod}`)
  }
}
