import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { PersonaService } from '../services/persona.service';
import { Usuario } from '../entities/usuario';
import { Rol } from '../entities/rol';
import { RolService } from '../rol/rol.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registrousario.component.html',
  styleUrls: ['./registrousuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  roles: Rol[] = [];
  errorInicio: boolean = false;
  loading: boolean = false;
  usuario: Usuario = new Usuario();
  public personaB: Array<any> = [];
  public editMode: boolean = false;
  @ViewChild('crearForm') crearForm!: NgForm;

  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private rolservice: RolService
  ) {}

  ngOnInit(): void {
    this.cargarListRoles();
  }
  cargarListRoles() {
    this.rolservice.getRoles().subscribe(
      role => (this.roles = role)
      );
  }
  public listarPersonas() {
    this.personaService.getPersonas().subscribe((resp: any) => {
      this.personaB = resp.data;
    });
  }

  public create(): void {
    if (this.editMode) {
      this.usuarioService.createPerson(this.usuario).subscribe((usuario) => {
        Swal.fire('Usuario Actualizado', `Custodio actualizado con éxito`, 'success');
        this.cleanFields();
      });
    } else {
      this.usuarioService.createPerson(this.usuario).subscribe((usuario) => {
        Swal.fire('Usuario Guardado', `Usuario guardado con éxito`, 'success');
        this.cleanFields();
      });
    }
  }
  // Método para guardar el ID del rol seleccionado
  onRolChange(): void {
    /*const selectedRoleId = this.usuario.roles.rol_cod; // ID del rol seleccionado
  
    const selectedRole = this.usuario.roles.find((role) => role.rol_cod === selectedRoleId);
    console.log('Objeto del rol seleccionado:', selectedRole);*/
  }
  

  private closeModal(): void {
    const cancelButton = document.querySelector('.modal-footer .btn-secondary') as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }  
  
  private cleanFields(): void {
    this.closeModal();
    this.crearForm.reset();
  }
 
}
