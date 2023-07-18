import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { PersonaService } from '../services/persona.service';
import { Usuario } from '../entities/usuario';
import { Persona } from '../entities/persona';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  errorInicio: boolean = false;
  loading: boolean = false;
  usuario: Usuario = new Usuario();
  usuarios: any;
  persona: Persona = new Persona();
  personas : any;
  public personaB: Array<any> = [];
  public editMode: boolean = false;
  @ViewChild('crearForm') crearForm!: NgForm;


  constructor(private usuarioService: UsuarioService, private personaService: PersonaService) { }

  ngOnInit(): void { }

  public listarPersonas() {
    this.personaService.getPersonas().subscribe((resp: any) => {
      console.log(resp.data);
      this.personaB = resp.data;
    });
  }
  // public create(ide: any): void {
  //   this.usuario.usu_per_cod = ide;
  //   this.personaService
  //   .createPersona(this.persona)
  //     .then((response) => {
  //       this.personas = response['data'];
  //       console.log(this.personas[0].per_cod);
  //       console.log(this.persona);
  //     })
  //     .catch((err) => {});
  // }

  // public createUsuario(): void {
  //   //this.informe.idinforme.idVisita == idd;
  //   //this.usuario.registroUsuario = this.usuarios[0];
  //   //console.log(this.formulario);
  //   this.usuarioService.createUser(this.usuario).subscribe((Response) => {
  //     console.log(Response);
  //     Swal.fire(
  //       'Usuario Guardado',
  //       `Usuario creado con exito!`,
  //       'success'
  //     );
  //   });
  // }


  // crear(){
  //   const formulario: any = document.getElementById("crear");
  //   const formularioValido = formulario.reportValidity();
  //   if (formularioValido) {
  //     this.loading = true;
  //     console.log('Valores enviados:', this.usuario);
  //     this.usuarioService.createUser(this.usuario).subscribe(
  //       (response: any) => {
  //         this.loading = false;
  //         if (response) {
  //           if (response.hasOwnProperty("usuario")) {
  //             this.errorInicio = false;
  //             localStorage.setItem("usuario", JSON.stringify(response.usuario));
  //             location.href = 'registro';
  //           } else {
  //             console.error('Error de registro::', response);
  //             this.errorInicio = true;
  //           }
  //         } else {
  //           console.error('Error de registro:', response);
  //           this.errorInicio = true;
  //         }
  //       },
  //       (error: any) => {
  //         this.loading = false;
  //         this.errorInicio = true;
  //       }
  //     );
  //   }
  //   if (formularioValido) {
  //     this.loading = true;
  //     console.log('Valores enviados:', this.persona);
  //     this.personaService.createPersona(this.persona).subscribe(
  //       (response: any) => {
  //         this.loading = false;
  //         if (response) {
  //           if (response.hasOwnProperty("persona")) {
  //             this.errorInicio = false;
  //             localStorage.setItem("persona", JSON.stringify(response.persona));
  //             location.href = 'registro';
  //           } else {
  //             console.error('Error de registro::', response);
  //             this.errorInicio = true;
  //           }
  //         } else {
  //           console.error('Error de registro:', response);
  //           this.errorInicio = true;
  //         }
  //       },
  //       (error: any) => {
  //         this.loading = false;
  //         this.errorInicio = true;
  //       }
  //     );
  //   }
  // }

  // iniciar(){
  //   location.href="login";
  // }
  
  public create(): void {
    if (this.editMode) {
      this.usuarioService.createCustodio(this.usuario).subscribe(
        usuario => {
          if(usuario != null) {
            Swal.fire('Cliente Actualizado', `Custodio actualizado con éxito`, 'success');
            this.cleanFields();
          } else {
            Swal.fire('Cliente Actualizado', `No se pudo actualizar el cliente`, 'error');
          }
        }
      );
    } else {
      this.usuarioService.createCustodio(this.usuario).subscribe(
        usuario => {
          if(usuario != null){
            Swal.fire('Cliente Guardado', `Cliente guardado con éxito`, 'success');
            this.cleanFields();
          } else {
            Swal.fire('Cliente Guardado', `No se pudo guardar el cliente`, 'error');
          }
        }
      );
    }
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
