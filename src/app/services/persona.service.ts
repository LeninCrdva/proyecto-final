import { Injectable } from '@angular/core';
import { Persona } from '../entities/persona';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

 
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  urlEndPoint = 'http://localhost:8080/tecazuay';
  urlCrearPersona = this.urlEndPoint + '/personas';

  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json' })

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlEndPoint);
  }

  createPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.urlCrearPersona, persona, {headers: this.httpHeaders})
  }
  //Metodo para crear persona por Promise
  // createPersona(persona: Persona): Promise<any> {
  //   return this.http
  //   .post(this.urlCrearPersona, persona, { headers: this.httpHeaders })
  //   .toPromise();
  // }

  getPersona(id: any): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`)
  }

}
