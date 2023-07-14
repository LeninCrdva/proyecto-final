import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

import Swal from 'sweetalert2';
import { Router,NavigationExtras  } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  errorInicio: boolean = false;
  loading: boolean = false;
  usuario: any = {};


  constructor(private usuarioService: UsuarioService, private router: Router) { }

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
                  if (userData) {
                    console.log('Datos del usuario:', userData);
                    const rolNombre = userData[0].roles && userData[0].roles.length > 0 ? userData[0].roles[0].rol_nombre : null;
                    
                    console.log('Rol Nombre:', rolNombre); // Imprimir el nombre del rol en la consola
                    
                    if (rolNombre === "Super Usuario") {
                      // Redireccionar a la página de ubicaciónpaginaadmin
                      this.usuarioService.setDatosUsuario({
                        usuario: this.usuario.usuario,
                        contrasenia: this.usuario.contrasenia,
                        userData: userData[0]
                      });
                      location.href = 'perfil';
                    
                    } else {
                      // Redireccionar a otra página (por ejemplo, ubicacion luego cambiar)
                      location.href = 'ubicacion';
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
