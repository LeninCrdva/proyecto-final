import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Bien } from '../entities/bien';
import { Observable } from 'rxjs';
import { Categoria } from '../entities/categoria';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  private urlEndPoint: string = 'http://localhost:8080/tecazuay/bien'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.urlEndPoint);
  }
  //metodo para traer bienes de custodios
  getBienesCustodio() {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Bien[]));
  }

  createBien(bien: Bien): Observable<Bien[]> {
    return this.http.post<Bien[]>(this.urlEndPoint, bien, { headers: this.httpHeaders });
  }

  getBien(id: any): Observable<Bien> {
    return this.http.get<Bien>(`${this.urlEndPoint}/${id}`)
  }
  getBienesPorUsuarioYContrasenia(usuario: string, contrasenia: string): Observable<Bien[]> {
    const params = new HttpParams()
      .set('usuario', usuario)
      .set('contrasenia', contrasenia);

    return this.http.get<Bien[]>(`${this.urlEndPoint}/usuario-contrasenia`, { params });
  }

  getBienesByArgument(argument: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.urlEndPoint}/argument`, { params: { argument } });
  }


  // getBienesByArgument(argument: string): Observable<Bien[]> {
  //   return this.http.get<Bien[]>(`${this.urlEndPoint}/${argument}`);
  // }


}
