import { Component } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { Propietario } from '../entities/propietario';
import { Usuario } from '../entities/usuario';
import { Ubicacion } from '../entities/ubicaciones';
import { BienesService } from '../services/bienes.service';
import { CategoriaService } from '../services/categoria.service';
import { PropietarioService } from '../services/propietario.service';
import { UsuarioService } from '../services/usuario.service';
import { UbicacionesService } from '../services/ubicaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-bienes',
  templateUrl: './form-bienes.component.html',
  styleUrls: ['./form-bienes.component.css'],
})
export class FormBienesComponent {
  
  ngOnInit(): void {
    this.cargarBien();
    this.cargarListaBienes();
    this.cargarListaCategorias();
    this.cargarListaPropietario();
    this.cargarListaUsuarios();
    this.cargarListaUbicaciones();
  }

  modalTitle: string = 'Ingresar bien';
  codSeleccionado!: string;
  seleccionado: boolean = false;
  filaSelect: Bien | null = null;
  bien: Bien = new Bien();
  bienes: Bien[] = [];
  propietarios: Propietario[] = [];
  categorias: Categoria[] = [];
  usuarios!: Usuario[];
  ubicaciones: Ubicacion[] = [];
  constructor(
    private bienService: BienesService,
    private categoriaService: CategoriaService,
    private propietarioService: PropietarioService,
    private usuarioService: UsuarioService,
    private ubicacionService: UbicacionesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  cargarListaBienes() {
    this.bienService.getBienes().subscribe(
      bien => (this.bienes = bien)
    );
  }

  cargarListaCategorias() {
    this.categoriaService.getCategoria().subscribe(
      categoria => (this.categorias = categoria)
    );
  }

  cargarListaPropietario() {
    this.propietarioService.getPropietarios().subscribe(
      propietario => (this.propietarios = propietario)
    );
  }

  cargarListaUsuarios() {
    this.usuarioService.getUsers().subscribe(
      user => (this.usuarios = user)
    );
  }

  cargarListaUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe(
      ubicacion => (this.ubicaciones = ubicacion)
    );
  }

  public CrearBien(): void {
    this.bienService.createBien(this.bien).subscribe(
      bien => {
        console.log(bien);
        this.CloseModal();
        Swal.fire(
          'Bien Agregado',
          `Bien ${this.bien.bien_descripcion} guardado`,
          'success'
        );
        this.router.navigate(['/bienes']);
      },
      error => {
        console.error(error);
        Swal.fire(
          'Error',
          'Ocurrió un error al guardar el bien',
          'error'
        );
      }
    );
  }

  /*
  public handleSubmit(): void {
    if (this.bien.bien_cod) {
      console.log(this.bien + ' asdsadsadsad')
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          this.router.navigate(['/bienes']);
          Swal.fire('Bien Modificado', `Bien modificado con éxito`, 'success');
        }
      );
    } else {
      console.log(this.bien + ' asdsadsadsad');
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          this.CloseModal();
          Swal.fire(
            'Bien Agregado',
            `Bien ${this.bien.bien_descripcion} guardado`,
            'success'
          );
          this.router.navigate(['/bienes']);
        }
      );
    } 
  }
*/
  selectRow(bi: Bien) {
    this.codSeleccionado = bi.bien_cod.toString();
    this.filaSelect = bi;
    this.seleccionado = true;
  }

  public cargarBien(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['bien_cod'];
      if (id) {
        this.bienService.getBien(id).subscribe(bien => {
          this.bien = bien;
        });
      }
    });
  }
  
  CloseModal(): void {
    const cancelButton = document.querySelector('.modal-footer-form #CloseModal') as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }

  // Método para guardar el ID de la categoría seleccionada
  onCategoriaChange(): void {
    console.log('ID de categoría seleccionada:', this.bien.categoria.cat_cod);
  }

  // Método para guardar el ID del propietario seleccionado
  onPropietarioChange(): void {
    console.log('ID de propietario seleccionado:', this.bien.propietario.pro_cod);
  }

  // Método para guardar el ID del usuario (custodio) seleccionado
  onCustodioChange(): void {
    console.log('ID de usuario (custodio) seleccionado:', this.bien.usuario.usu_cod);
  }

  onUbicacionChange(): void {
    console.log('ID de la ubicación seleccionado:', this.bien.ubicacion.ubi_cod);
  }
}
