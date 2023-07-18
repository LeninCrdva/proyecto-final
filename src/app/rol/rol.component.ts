import { Component, OnInit } from '@angular/core';
import { Rol } from '../entities/rol';
import { RolService } from './rol.service';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  constructor(private rolservice: RolService) { }
  ngOnInit(): void {
    this.cargarLista()
  }

  cargarLista(): void {
    this.rolservice.getRoles().subscribe(
      roles => this.roles = roles
    );
  }

  validarSoloLetras(nombre: string): boolean {
    const regex = /^[A-Za-z]+$/; // Expresión regular para letras en mayúsculas o minúsculas
    return regex.test(nombre);
  }
}
