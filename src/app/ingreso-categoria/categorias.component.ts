import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../entities/categoria';

//import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categFiltradas: Categoria[] = [];
  codSeleccionado: string = '';
  filaSelect: Categoria | null = null;
  filtrar: string = '';
  seleccionado: boolean = false;

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriaService.getCategoria().subscribe(
      categorias => {
        this.categorias = categorias;
        this.categFiltradas = categorias;
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
      this.categFiltradas = this.categorias.filter(categ => categ.cat_estado === true);
    } else if (filtro === 'inactivo') {
      this.categFiltradas = this.categorias.filter(categ => categ.cat_estado === false);
    } else if (filtro === 'busqueda') {
      if (this.filtrar.trim() === '') {
        this.categFiltradas = this.categorias;
      } else {
        const filtroTxt = this.filtrar.toLowerCase().trim();
        this.categFiltradas = this.categorias.filter(
          categ => categ.cat_nombre.toLowerCase().includes(filtroTxt) ||
                    categ.cat_descripcion.toLowerCase().includes(filtroTxt)
        );
      }
    }
  }
}



