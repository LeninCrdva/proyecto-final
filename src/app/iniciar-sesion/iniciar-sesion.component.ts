import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  errorInicio: boolean = false;
  loading: boolean = false;
  usuario: any = {};


  constructor(private usuarioService: UsuarioService, private router: Router, public dataStorageService: DataStorageService) { }

  ngOnInit(): void { }

  login(): void {
    
    const formulario: any = document.getElementById("login");
    const formularioValido = formulario.reportValidity();
    if (formularioValido) {
      this.loading = true;
      console.log('Valores enviados:', this.usuario);
      this.usuarioService.login(this.usuario).subscribe(
        (response: any) => {
          this.loading = false;
          if (response) {
            if (response.hasOwnProperty("usuario")) {
              this.errorInicio = false;
              Swal.fire('Ingreso exitoso', '¡Bienvenido!', 'success');
              localStorage.setItem("usuario", JSON.stringify(response.usuario));
              this.usuarioService.findUsuariosWithDatosCompletos(this.usuario.usuario, this.usuario.contrasenia).subscribe(
                (userData: any) => {
                  if (userData && userData.length > 0) {
                    const userDataItem = userData[0];
                    console.log('Datos del usuario:', userData);
                    const rolNombre = userData[0].roles && userData[0].roles.length > 0 ? userData[0].roles[0].rol_nombre : null;
                   const primerNombre = userDataItem.persona && userDataItem.persona.perPrimerNom ? userDataItem.persona.perPrimerNom : '';
                   const segundoNombre = userDataItem.persona && userDataItem.persona.perSegundoNom ? userDataItem.persona.perSegundoNom : '';
                   const apellidoPaterno = userDataItem.persona && userDataItem.persona.perApellidoPater ? userDataItem.persona.perApellidoPater : '';
                   const apellidoMaterno = userDataItem.persona && userDataItem.persona.perApellidoMater ? userDataItem.persona.perApellidoMater : '';
                    console.log('Rol Nombre:', rolNombre); // Imprimir el nombre del rol en la consola
                    const datosGuardados = {
                      rolNombre :userData[0].roles && userData[0].roles.length > 0 ? userData[0].roles[0].rol_nombre : null,
                      primerNombre: primerNombre,
                      segundoNombre: segundoNombre,
                     apellidoPaterno: apellidoPaterno,
                     apellidoMaterno: apellidoMaterno,
                      cedula: userDataItem.persona && userDataItem.persona.perCedula ? userDataItem.persona.perCedula : '',
                      correo: userDataItem.persona && userDataItem.persona.perEmail ? userDataItem.persona.perEmail : '',
                      usuario: this.usuario.usuario,
                      contrasenia: this.usuario.contrasenia
                    };
                    this.dataStorageService.setData('datosUsuario', datosGuardados);

                    console.log('Datos guardados en:', this.dataStorageService.getData('datosUsuario'));
              
                    if (rolNombre === "Super Usuario") {
                      // Redireccionar a la página de ubicaciónpaginaadmin
                      location.href = 'superusuario';//'/paginaadmin'
                     //this.router.navigate(['/perfil']);
                     //this.router.navigate(['/paginaadmin']);
                    
                    } else {
                      // Redireccionar a otra página (por ejemplo, ubicacion luego cambiar)
                      //this.router.navigate(['/perfil']);
                      //this.router.navigate(['/ubicacion']);//cargado
                      if(rolNombre=="Rector"){

                      }
                      else{
                        location.href = 'biencustodio';
                      }
                    // this.router.navigate(['/biencustodio']);
                    }
                  }
                  
                },
                (error: any) => {
                  console.error('Error al obtener los datos del usuario:', error);
                }
              );
            } else {
              console.error('Error de inicio de sesión:', response);
              this.errorInicio = true;
            }
          } else {
            console.error('Error de inicio de sesión:', response);
            this.errorInicio = true;
          }
        },
        (error: any) => {
          this.loading = false;
          this.errorInicio = true;
        }
      );
    }
  }

  registroCuenta() {
    location.href = "registro";
  }
}
