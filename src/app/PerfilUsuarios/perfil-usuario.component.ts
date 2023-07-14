import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-PerfilUsuarios',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuariosComponent implements OnInit {
  datosUsuario: Array<string> = [];

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const usuario = params['usuario'];
      const contrasenia = params['contrasenia'];

      // Llamar al servicio para obtener los datos del usuario utilizando usuario y contrasenia
      this.usuarioService.findUsuariosWithDatosCompletos(usuario, contrasenia).subscribe(
        (userData: any) => {
          if (userData && userData.length > 0) {
            const userDataItem = userData[0];
            this.datosUsuario = [
              userDataItem.persona.perCedula || '',
              userDataItem.persona.perPrimerNom || '',
              userDataItem.persona.perSegundoNom || '',
              userDataItem.persona.perApellidoPater || '',
              userDataItem.persona.perApellidoMater || '',
              userDataItem.persona.perEmail || '',
              userDataItem.usuario || '',
              userDataItem.contrasenia || ''
            ];
          }
        },
        (error: any) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    });
  }
}
