import { Component, OnInit } from '@angular/core';
import { Propietario } from '../entities/propietario';
import { PropietarioService } from '../services/propietario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-propietarios',
  templateUrl: './form-propietarios.component.html'
})
export class FormPropietariosComponent {
  public propietario: Propietario = new Propietario();
  titulo: string = "Crear propietario";

  constructor(
    private propietarioService: PropietarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarPropietario();
  }

  cargarPropietario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Editar propietario";
        this.propietarioService.getPropietario(id).subscribe(propietario => {
          this.propietario = propietario;
        });
      }
    });
  }

  public save(): void {
    if (this.propietario.pro_cod) {
      // Actualización del propietario existente
      this.propietarioService
        .updatePropietario(this.propietario.pro_cod, this.propietario)
        .subscribe(
          propietarioActualizado => {
            this.router.navigate(['/propietario']);
            Swal.fire(
              'Propietario actualizado',
              `Propietario ${propietarioActualizado.pro_nombre} actualizado con éxito`,
              'success'
            );
          },
          error => {
            console.error('Error al actualizar el propietario:', error);
          }
        );
    } else {
      // Creación de un nuevo propietario (mantener el código existente para la creación)
      this.propietarioService.create(this.propietario).subscribe(
        propietarioCreado => {
          this.router.navigate(['/propietario']);
          Swal.fire(
            'Propietario creado',
            `Propietario ${propietarioCreado.pro_nombre} creado con éxito`,
            'success'
          );
        },
        error => {
          console.error('Error al crear el propietario:', error);
        }
      );
    }
  }
}
