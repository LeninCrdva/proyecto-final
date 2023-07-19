import { Component, OnInit } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-Pagina-Admin',
  templateUrl: './pagina-admin.component.html',
  styleUrls: ['./pagina-admin.component.css']
})
export class PaginaAdminComponent implements OnInit {
  usuarios: Usuario[]=[];
  usuariosCustodios: Usuario[]=[];

  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.cargarCustodios();
  }

  cargarCustodios(): void {
    this.usuarioService.getUsers().subscribe(
      users => {
        this.usuarios = users
        this.usuariosCustodios = this.usuarios.filter(
          usuario => usuario.roles.some(
            rol => rol.rol_nombre === 'Custodio'
          )
        );
      }
    );
  }
}
