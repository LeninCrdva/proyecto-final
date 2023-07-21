import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../entities/categoria';
import { DataStorageService } from '../PerfilUsuarios/data-storage.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriasComponent implements OnInit {
  rolUsuario: string = '';
  categorias: Categoria[] = [];
  categFiltradas: Categoria[] = [];
  codSeleccionado: string = '';
  filaSelect: Categoria | null = null;
  filtrar: string = '';
  seleccionado: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    const userData = this.dataStorageService.getData('datosUsuario');
    this.rolUsuario = userData.rolNombre;
    console.log('Su rol es:', this.rolUsuario);
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategoria().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.filtrarCategorias('activo');
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  selectRow(categ: Categoria) {
    this.codSeleccionado = categ.cat_cod.toString();
    this.filaSelect = categ;
    this.seleccionado = true;
  }

  editarCategoria() {
    if (this.seleccionado) {
      this.router.navigate(['/categoria/form', this.codSeleccionado]);
    } else {
      Swal.fire('Error', 'Por favor, selecciona una fila antes de editar.', 'error');
    }
  }

  filtrarCategorias(filtro: string) {
    if (filtro === 'activo') {
      this.categFiltradas = this.categorias.filter((categ) => categ.cat_estado === true);
    } else if (filtro === 'inactivo') {
      this.categFiltradas = this.categorias.filter((categ) => categ.cat_estado === false);
    } else if (filtro === 'busqueda') {
      if (this.filtrar.trim() === '') {
        this.categFiltradas = this.categorias;
      } else {
        const filtroTxt = this.filtrar.toLowerCase().trim();
        this.categFiltradas = this.categorias.filter(
          (categ) =>
            categ.cat_nombre.toLowerCase().includes(filtroTxt) ||
            categ.cat_descripcion.toLowerCase().includes(filtroTxt)
        );
      }
    }
  }

  cambiarEstado(activar: boolean) {
    if (!this.filaSelect) {
      Swal.fire('Error', 'Por favor, selecciona una fila', 'error');
      return;
    }

    const nuevoEstado = activar ? true : false;

    if (nuevoEstado === this.filaSelect.cat_estado) {
      Swal.fire('Error', 'La categoría ya está en el estado seleccionado.', 'error');
      return;
    }

    this.filaSelect.cat_estado = nuevoEstado;

    this.categoriaService.updateEstado(this.filaSelect).subscribe(
      () => {
        const estadoAccion = activar ? 'activada' : 'eliminada';
        Swal.fire('Correcto', `Categoría ${estadoAccion} correctamente.`, 'success');
        this.cargarCategorias(); // Actualizar la tabla después de cambiar el estado
      },
      (error) => {
        Swal.fire('Error', 'Error al cambiar el estado de la categoría.', 'error');
      }
    );
  }

  contextMenuClick(event: Event, activar: boolean) {
    event.preventDefault();

    if (activar && this.filaSelect && !this.filaSelect.cat_estado) {
      Swal.fire({
        title: 'Activar categoría',
        text: '¿Estás seguro de que deseas activar esta categoría?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, activar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.cambiarEstado(true);
        }
      });
    } else {
      this.cambiarEstado(false);
    }
  }
}
