import { Injectable } from '@angular/core';
//import { CATEGORIA } from './categoria.json';
import { Categoria } from '../entities/categoria';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/tecazuay/categoria';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getCategoria(): Observable<Categoria[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Categoria[])
    );
  }

  create (categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders})
  }

  getCategorias(cat_cod: number): Observable<Categoria>{
    return this.http.get<Categoria> (`${this.urlEndPoint}/${cat_cod}`);
  }


  
}
