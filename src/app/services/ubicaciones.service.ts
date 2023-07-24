import { Injectable } from '@angular/core';
import { Ubicacion } from '../entities/ubicaciones';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  private urlEndPoint: string = 'http://localhost:8080/tecazuay/ubicacion';
  private httpHeaders = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

  getUbicaciones(): Observable<Ubicacion[]> {  
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Ubicacion[])
    );
  }

  getUbicacion(id: number): Observable<Ubicacion> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.get<Ubicacion>(url);
  }

  create(ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.urlEndPoint, ubicacion, { headers: this.httpHeaders });
  }

  update(ubicacion: Ubicacion): Observable<Ubicacion> {
    const url = `${this.urlEndPoint}/${ubicacion.ubi_cod}`;
    return this.http.put<Ubicacion>(url, ubicacion, { headers: this.httpHeaders });
  }
  getUbicacionesByDepartamento(departamento: string): Observable<Ubicacion[]> {
    const params = new HttpParams().set('departamento', departamento);
    const url = `${this.urlEndPoint}/departamento`;
    console.log('URL de la solicitud: ', url); // Agrega esta línea para imprimir la URL en la consola
    return this.http.get<Ubicacion[]>(url, { params });
  }
  
}
