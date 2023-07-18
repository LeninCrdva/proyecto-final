import { Injectable } from '@angular/core';
import { Rol } from '../entities/rol';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolService {

 

private urlEndpoint: string="http://localhost:8080/tecazuay/roles";
private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});


 constructor(private http:HttpClient) { }
getRoles():Observable<Rol[]>
{
  return this.http.get<Rol[]>(this.urlEndpoint);
  //return this.get(this.urlEndpoint).pipe(

    //map(response => response as Rol[])
}
create(rol:Rol):Observable<Rol>{
return this.http.post<Rol>(this.urlEndpoint,rol,{headers:this.httpHeaders})

}
getRol(id:number):Observable<Rol> {
  return this.http.get<Rol>(`${this.urlEndpoint}/${id}`)
}

update(rol:Rol):Observable<Rol>{
  return this.http.put<Rol>(this.urlEndpoint,rol);
}

}
