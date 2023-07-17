import { Component, OnInit } from '@angular/core';
import { Ubicacion } from '../entities/ubicaciones';
import { UbicacionesService } from '../services/ubicaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-ubicaciones',
  templateUrl: './form-ubicaciones.component.html',
  styleUrls: ['./form-ubicaciones.component.css']
})
export class FormUbicacionesComponent implements OnInit {

  public ubicacion: Ubicacion = new Ubicacion();

  constructor(
    private ubicacionService: UbicacionesService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ubicacionService.getUbicacion(id).subscribe(
          ubicacion => (this.ubicacion = ubicacion)
        );
      }
    });
  }

  public create(): void {
    Swal.fire({
      title: "¿Desea guardar la nueva ubicación?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      closeButtonHtml: "Cancelar",
      position: 'center',
      allowOutsideClick: false,
    }).then(resultado => {
      if (resultado.value) {
        Swal.fire('Guardado Correctamente', ``, 'success');
        this.ubicacionService.create(this.ubicacion).subscribe(() => {
          this.router.navigate(['/ubicaciones']);
        });
      }
    });
  }

  public update(): void {
    if (this.ubicacion.ubi_cod) {
      Swal.fire({
        title: "¿Desea guardar los cambios?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        closeButtonHtml: "Cancelar",
        position: 'center',
        allowOutsideClick: false,
      }).then(resultado => {
        if (resultado.value) {
          Swal.fire('Actualizado Correctamente', ``, 'success');
          this.ubicacionService.update(this.ubicacion).subscribe(() => {
            this.router.navigate(['/ubicaciones']);
          });
        }
      });
    }
  }
}
