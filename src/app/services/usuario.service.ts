import { Injectable } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/tecazuay';

  urlCreateUsuario = this.apiUrl + '/usuarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  datosUsuario: any = {};
  
  setDatosUsuario(datos: any): void {
    this.datosUsuario = datos;
    console.log('Datos de usuario guardados:', this.datosUsuario);
  }

  getDatosUsuario(): any {
    return this.datosUsuario; 
  }

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    //return this.http.get<Usuario>(`${this.apiUrl}/usuarios`);
    return this.http.get(this.urlCreateUsuario).pipe(
      map(response => response as Usuario[])
    );
  }
  
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  createCustodio(usuario: Usuario):  Observable<Usuario> {
    return this.http.post<Usuario>(this.urlCreateUsuario, usuario, {headers: this.httpHeaders,});
  }

  createPerson(usuario: Usuario):  Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/users`, usuario, {headers: this.httpHeaders,});
  }

  updateUser(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
  }

  findUserByCriterio(criterio: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/criterio?criterio=${criterio}`);
  }

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/logina`, usuario, {headers: this.httpHeaders});
  }
  findUsuariosWithDatosCompletos(usuario: string, contrasenia: string): Observable<any> {
    const params = new HttpParams()
      .set('usuario', usuario)
      .set('contrasenia', contrasenia);

    return this.http.get<any>(`${this.apiUrl}/usuarios/datos-completos`, { params });
  }
}
