import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { BienesService } from '../services/bienes.service';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html'
})
export class BienesComponent implements OnInit {
  
  modalTitle: string = 'Ingresar bien';
  
  bienes: Bien[] = [];

  categorias: Categoria[] = [];

  constructor(private bienesService: BienesService, private categoriasService: CategoriaService) { }

  ngOnInit(): void {
    this.cargarListaBienes()
  }

  cargarListaBienes() {
    this.bienesService.getBienes().subscribe(
      bien => this.bienes = bien
    )
  }

  cargarListaCategorias() {
    this.categoriasService.getCategoria().subscribe(
      categoria => this.categorias = categoria
    )
    console.log(this.categorias)
  }

}
