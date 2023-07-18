import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { PersonaService } from '../services/persona.service';
import { Usuario } from '../entities/usuario';
import { Persona } from '../entities/persona';
import { Rol } from '../entities/rol';
import { RolService } from '../rol/rol.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registrousario.component.html',
  styleUrls: ['./registrousuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = new Rol();
  errorInicio: boolean = false;
  loading: boolean = false;
  usuario: Usuario = new Usuario();
  usuarios: any;
  persona: Persona = new Persona();
  personas: any;
  public personaB: Array<any> = [];
  public editMode: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rolservice: RolService
  ) {}

  ngOnInit(): void {
    this.cargarListRoles();
  }
  cargarListRoles() {
    this.rolservice.getRoles().subscribe((rol) => (this.roles = rol));
  }
  public listarPersonas() {
    this.personaService.getPersonas().subscribe((resp: any) => {
      console.log(resp.data);
      this.personaB = resp.data;
    });
  }

  public create(): void {
    if (this.editMode) {
      this.usuarioService.createCustodio(this.usuario).subscribe((usuario) => {
        Swal.fire('Usuario Actualizado', `Custodio actualizado con éxito`, 'success');
      });
    } else {
      this.usuarioService.createCustodio(this.usuario).subscribe((usuario) => {
        Swal.fire('Usuario Guardado', `Usuario guardado con éxito`, 'success');
      });
    }
  }
  // Método para guardar el ID del rol seleccionado
  onRolChange(): void {
  
      console.log('ID del rol seleccionado', this.usuario.rol.rol_cod);
  }


 
}
