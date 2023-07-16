import { Component } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { Propietario } from '../entities/propietario';
import { Usuario } from '../entities/usuario';
import { BienesService } from '../services/bienes.service';
import { CategoriaService } from '../services/categoria.service';
import { PropietarioService } from '../services/propietario.service';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-bienes',
  templateUrl: './form-bienes.component.html'
})
export class FormBienesComponent {
  
  bien: Bien = new Bien();

  bienes: Bien[] = [];
  propietarios: Propietario[] =[];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  
  constructor(private bienService: BienesService, private categoriaService: CategoriaService,
     private propietarioService: PropietarioService, private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarListaBienes()
    this.cargarListaCategorias()
    this.cargarListaPropietario()
    this.cargarListaUsuarios()
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

  cargarListaUsuarios() {
    this.usuarioService.getUsers().subscribe(
      user  => this.usuarios = user
    )
  }

  public handleSubmit(): void {
    if (this.bien.bien_cod) {
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          console.log(bien);
          Swal.fire(
            'Bien Agregado',
            `Bien ${this.bien.bien_descripcion} guardado`,
            'success'
          );
          this.router.navigate(['/bienes']);
        }
      );
    } else {
     try {
      this.bienService.createBien(this.bien).subscribe(
        bien => {
          console.log(bien);
          this.router.navigate(['/bienes']);
        }
      );
     } catch (error) {
      console.log(this.bien);
      console.log('Error Here');
     }
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
