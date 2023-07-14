import { Component } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { BienesService } from '../services/bienes.service';
import { CategoriaService } from '../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-bienes',
  templateUrl: './form-bienes.component.html'
})
export class FormBienesComponent {
  
  protected bien: Bien = new Bien();

  categorias: Categoria[] = [];

  constructor(private bienService: BienesService, private categoriaService: CategoriaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarBien()
    this.cargarListaCategorias()
  }

  cargarListaCategorias() {
    this.categoriaService.getCategoria().subscribe(
      categoria => this.categorias = categoria
    )
  }

  public handleSubmit(): void {
    if (this.bien.bien_cod) {
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          console.log(bien);
          this.router.navigate(['/bienes']);
        }
      );
    } else {
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          console.log(bien);
          this.router.navigate(['/bienes']);
        }
      );
    }
  }

  public cargarBien(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.bienService.getBien(id).subscribe((bien) => {
          this.bien = bien;
        });
      }
    });
  }
}
