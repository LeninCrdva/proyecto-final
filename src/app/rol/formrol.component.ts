import { Component, OnInit } from '@angular/core';
import { Rol } from '../entities/rol';
import { RolService } from './rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './formrol.component.html',
  styleUrls: ['./formrol.component.css']
})
export class FormRolComponent implements OnInit {
  public Rol: Rol = new Rol();
  public titulo: string = "Creacion de Rol"
  public editMode: boolean = false;


  constructor(private rolService: RolService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("realizo click")
    //console.log(this.Rol)
    this.cargarRol()
  }
  public create(): void {
    if (!this.validarSoloLetras(this.Rol.rol_nombre)) {
      Swal.fire('Error', 'Completa el campo: el nombre debe contener solo letras', 'error');
      return;
    }
  
    if (this.editMode) {
      this.rolService.create(this.Rol).subscribe(
        rol => {
          this.router.navigate(['/ingresorol']);
        }
      );
    } else {
      this.rolService.create(this.Rol).subscribe(
        rol => {
          this.router.navigate(['/ingresorol']);
          Swal.fire('Rol Guardado', `Cliente ${rol.rol_cod} guardado con éxito`, 'success');
        }
      );
    }
  }
  

    /*
    public create(): void {
      this.rolService.create(this.Rol).subscribe(
        rol => {
          this.router.navigate(['/ingresorol']);
          Swal.fire('Rol Guardado', `Rol ${rol.rol_cod} guardado con éxito`, 'success');
        }
      );
    
    
    }*/

    cargarRol(): void {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if (id) {
          this.rolService.getRol(id).subscribe((rol) => {
            this.Rol = rol;
            this.titulo = "Edicion de Rol";
          });
        } else {
          this.titulo = "Creacion de Rol";
        }
      });
    }
  


    updates(): void {
      this.rolService.update(this.Rol).subscribe(
        rol => {
          this.router.navigate(['/ingresorol']);
          Swal.fire('Rol Actualizado', 'El rol ha sido actualizado exitosamente', 'success');
        }
      );
    }

    validarSoloLetras(nombre: string): boolean {
      const regex = /^[A-Za-z\sáéíóúÁÉÍÓÚñÑüÜ]+$/; // Expresión regular para letras en mayúsculas o minúsculas, espacios en blanco y caracteres especiales
      return regex.test(nombre);
    }
  }