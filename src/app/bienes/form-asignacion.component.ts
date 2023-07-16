import { Component, OnInit } from '@angular/core';
import { Bien } from '../entities/bien';
import { Categoria } from '../entities/categoria';
import { CategoriaService } from '../services/categoria.service';
import { Propietario } from '../entities/propietario';
import { PropietarioService } from '../services/propietario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BienesService } from '../services/bienes.service';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

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
    this.cargarListaUsuarios()
  }

  constructor(private bienService: BienesService,private router: Router, private activatedRoute: ActivatedRoute,
    private categoriaService: CategoriaService, private propietarioService: PropietarioService, 
    private usuarioService: UsuarioService) {}

  public bien: Bien = new Bien();

  propietarios: Propietario[] =[];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];

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
      user => this.usuarios = user
    )
  }

  cargarBien(): void {
    this.activatedRoute.params.subscribe((params) => {
      let bien_cod = params['bien_cod'];
      if (bien_cod) {
        this.bienService
          .getBien(bien_cod)
          .subscribe((bien) => (this.bien = bien));
      }
    });
  }

  public Asignar(): void {
    this.bienService.createBien(this.bien).subscribe((bien) => {
      console.log(bien);
      Swal.fire(
        'Bien Asignado',
        `Bien ${this.bien.bien_codigoG} asignado a ${this.bien.usuario.persona.perPrimerNom + ' ' + this.bien.usuario.persona.perApellidoPater}`,
        'success'
      );
      this.router.navigate(['/bienes']);
    });
  }
}
