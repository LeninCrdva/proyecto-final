import { Component, OnInit } from '@angular/core';
import { Categoria } from '../entities/categoria';
import { CategoriaService } from '../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public categoria: Categoria = new Categoria();
  public titulo: string = 'Crear Categoría';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.activatedRoute.params.subscribe((params) => {
      let cat_cod = params['cat_cod'];
      if (cat_cod) {
        this.categoriaService
          .getCategorias(cat_cod)
          .subscribe((categoria) => (this.categoria = categoria));
      }
    });
  }

  public create(): void {
    this.categoriaService.create(this.categoria).subscribe((categoria) => {
      Swal.fire(
        'Categoría guardada',
        `Categoría ${this.categoria.cat_nombre} guardada con éxito`,
        'success'
      );
      this.router.navigate(['/categorias']);
    });
  }
}


