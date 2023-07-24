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

  constructor(
    private bienService: BienesService,
    private categoriaService: CategoriaService,
    private propietarioService: PropietarioService,
    private usuarioService: UsuarioService,
    private ubicacionService: UbicacionesService,
    private activatedRoute: ActivatedRoute,    
  ) {}

  modalTitle: string = 'Ingresar bien';
  codSeleccionado!: string;
  seleccionado: boolean = false;
  filaSelect: Bien | null = null;
  bien: Bien = new Bien();
  bienes: Bien[] = [];
  propietarios: Propietario[] = [];
  categorias: Categoria[] = [];
  Filtrocategorias: Categoria[] = [];
  usuarios!: Usuario[];
  FiltroUsuarioRector: Usuario[] = [];
  ubicaciones: Ubicacion[] = [];
  FiltroUbicaciones: Ubicacion[] = [];

  propietariosCargados = false;

// Método para comparar propietarios por pro_cod
compareFn(propietario1: Propietario | undefined, propietario2: Propietario | undefined): boolean {
  // Verificamos que ambos propietarios sean válidos antes de comparar sus códigos
  if (propietario1 && propietario2) {
    return propietario1.pro_cod === propietario2.pro_cod;
  }
  // Si alguno de los propietarios es undefined, no pueden ser iguales
  return false;
}

compareUbicaciones(ubi1: Ubicacion | undefined, ubi2: Ubicacion | undefined): boolean {
  // Verificamos que ambas ubicaciones sean válidas antes de comparar sus códigos
  if (ubi1 && ubi2) {
    return ubi1.ubi_cod === ubi2.ubi_cod;
  }
  // Si alguna de las ubicaciones es undefined, no pueden ser iguales
  return false;
}

// Función de comparación para categorías
compareCategorias(cat1: Categoria, cat2: Categoria): boolean {
  return cat1?.cat_cod === cat2?.cat_cod;
}

compareUsuarios(user1: Usuario | undefined, user2: Usuario | undefined): boolean {
  // Verificamos que ambos usuarios sean válidos antes de comparar sus códigos
  if (user1 && user2) {
    return user1.usu_cod === user2.usu_cod;
  }
  // Si alguno de los usuarios es undefined, no pueden ser iguales
  return false;
}

// Resto del código del componente

  cargarListaBienes() {
    this.bienService.getBienes().subscribe(
      bien => (this.bienes = bien)
    );
  }

  cargarListaCategorias() {
    this.categoriaService.getCategoria().subscribe(
      categoria => {
        this.categorias = categoria;
        this.CategoriasFiltro('activo');
      },
      error => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  CategoriasFiltro(filtro: string): void {
    if (filtro === 'activo') {
      this.Filtrocategorias = this.categorias.filter((cat) => cat.cat_estado === true);
    }
  }

  cargarListaUbicaciones() {
    this.ubicacionService.getUbicaciones().subscribe(
      ubicacion => {
        this.ubicaciones = ubicacion;
        this.UbicacionesFiltro('activo');
      },  error => {
        console.log('Error al cargar la lista: ', error)
      } 
    );
  }

  UbicacionesFiltro(filtro: string): void {
    if (filtro === 'activo') {
      this.FiltroUbicaciones = this.ubicaciones.filter((ubi) => ubi.ubi_estado === true);
      console.log(this.bien.bien_estadoA)
    } 
  }

  cargarListaPropietario() {
    this.propietarioService.getPropietarios().subscribe(
      propietario => {
        this.propietarios = propietario;
        this.propietariosCargados = true; // Actualizar la variable propietariosCargados
        console.log('Propietarios cargados:', this.propietarios);
      },
      error => {
        console.error('Error al cargar propietarios:', error);
      }
    );
  }
  
  cargarListaUsuarios() {
    this.usuarioService.getUsers().subscribe(
      user => {
        this.usuarios = user;
        this.RectorFiltro('rector'); 
      },
      error => {
        console.error('Error al cargar propietarios:', error);
      }
    );
  }

  RectorFiltro(filtro: string): void {
    if (filtro === 'rector') {
      this.FiltroUsuarioRector = this.usuarios.filter((usu) => usu.roles.some(rol => rol.rol_nombre === 'Rector'));
    } 
  }

  public CrearBien(): void {
    Swal.fire({
      title: 'Confirmar',
      text: `¿Estás seguro de agregar el bien "${this.bien.bien_descripcion}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bienService.createBien(this.bien).subscribe(
          bien => {
            console.log(bien);
            this.CloseModal();
            Swal.fire(
              'Bien Agregado',
              `Bien ${this.bien.bien_descripcion} guardado`,
              'success'
            );
            location.href = 'bienes';
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
    });
  }

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
