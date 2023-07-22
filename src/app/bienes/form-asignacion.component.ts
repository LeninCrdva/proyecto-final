import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { Propietario } from '../entities/propietario';
import { Ubicacion } from '../entities/ubicaciones';
import { Usuario } from '../entities/usuario';
import { CategoriaService } from '../services/categoria.service';
import { PropietarioService } from '../services/propietario.service';
import { BienesService } from '../services/bienes.service';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionesService } from '../services/ubicaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { of, switchMap } from 'rxjs';
import {ActaComponent} from '../Acta/acta';

@Component({
  selector: 'app-form-asignacion',
  templateUrl: './form-asignacion.component.html',
  styleUrls: ['./bienes-style.component.css'],
})
export class FormAsignacionComponent implements OnInit {
  
  ngOnInit(): void {
    this.cargarBien()
    this.cargarListaCategorias()
    this.cargarListaPropietario()
    this.cargarCustodios()
    this.cargarListaUbicaciones()
  }

  Title: string = 'Asignar Bien';

  constructor(private bienService: BienesService,private router: Router, private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService, private propietarioService: PropietarioService, 
    private usuarioService: UsuarioService, private ubicacionService: UbicacionesService) {}

  public bien: Bien = new Bien();

  propietarios: Propietario[] =[];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  ubicaciones: Ubicacion[] = [];
  usuariosCustodios: Usuario[] = [];
  cargarListaCategorias() {
    this.categoriaService.getCategoria().subscribe(
      categoria => this.categorias = categoria
    )
  }

  cargarListaPropietario() {
    this.propietarioService.getPropietarios().subscribe(
      propietario => this.propietarios = propietario
    )
  }

  /*cargarListaUsuarios() {
    this.usuarioService.getUsers().subscribe(
      user => this.usuarios = user
    )
  }*/
  cargarCustodios(): void {
    this.usuarioService.getUsers().subscribe(users => {
      this.usuarios = users;
      this.usuariosCustodios = this.usuarios.filter(usuario =>
        usuario.roles.some(rol => rol.rol_nombre === 'Custodio')
      );
    });
  }

  cargarListaUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe(
      ubicacion => (this.ubicaciones = ubicacion)
    );
  }

  cargarBien(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        let bien_cod = params['bien_cod'];
        if (bien_cod) {
          return this.bienService.getBien(bien_cod);
        } else {
          // Si no se proporciona un bien_cod, puedes devolver un observable vacío o null
          // según lo que necesites en tu lógica
          return of(null);
        }
      })
    ).subscribe((bien) => {
      if (bien) {
        this.bien = bien;
      }
    });
  }

  public Asignar(): void {
    this.bienService.createBien(this.bien).subscribe((bien) => {
      Swal.fire(
        'Bien Asignado',
        `Bien ${this.bien.bien_codigoG} asignado a ${this.bien.usuario.persona.perPrimerNom + ' ' + this.bien.usuario.persona.perApellidoPater}`,
        'success'
      );
      const custodioId = this.bien.usuario.usu_cod;
    this.router.navigate(['/acta'], { queryParams: { custodioId: custodioId } });
      //this.router.navigate(['/bienes']);
    });
  }

  CloseModal(): void {
    const cancelButton = document.querySelector('.modal-footer #CloseAsignar') as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }
  // Método para guardar el ID del usuario (custodio) seleccionado
  onCustodioChange(): void {
    console.log('ID de usuario (custodio) seleccionado:', this.bien.usuario.usu_cod);
    const custodioId = this.bien.usuario.usu_cod;
    //this.router.navigate(['/acta'], { queryParams: { custodioId: custodioId } });
  }
}
