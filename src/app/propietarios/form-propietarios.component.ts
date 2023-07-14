import { Component } from '@angular/core';
import { Propietario } from '../entities/propietario';
import { PropietarioService } from '../services/propietario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-propietarios',
  templateUrl: './form-propietarios.component.html'
})

export class FormPropietariosComponent {

  public propietario: Propietario = new Propietario()
  titulo: string = "Crear propietario"

  constructor(private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarPropietario()
  }

  cargarPropietario(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.propietarioService.getPropietario(id).subscribe((propietario) => this.propietario = propietario)
      }
    })
  }

  public create(): void {
    //console.log("ha realizado un clic")
    //console.log(this.propietario)
    console.log(this.propietario)
    this.propietarioService.create(this.propietario).subscribe(propietario => {
      this.router.navigate(['/propietario'])
      Swal.fire('Propietario guardado', `Propietario ${propietario.pro_nombre} guardado con éxito`, 'success');
    })
  }

}
