import { Component } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { BienesService } from '../services/bienes.service';
import { CategoriaService } from '../services/categoria.service';
import { Propietario } from '../entities/propietario';
import { PropietarioService } from '../services/propietario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-bienes',
  templateUrl: './form-bienes.component.html'
})
export class FormBienesComponent {
  
  bien: Bien = new Bien();

  bienes: Bien[] = [];
  propietarios: Propietario[] =[];
  categorias: Categoria[] = [];

  constructor(private bienService: BienesService, private categoriaService: CategoriaService, private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarListaBienes()
    this.cargarListaCategorias()
    this.cargarListaPropietario()
  }

  cargarListaBienes() {
    this.bienService.getBienes().subscribe(
      bien  => this.bienes = bien
    )
  }

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
