import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroUsuarioComponent } from './registro-usuarios/registrousuario.component';
import { RouterModule, Routes } from '@angular/router';

import { VentanaPrincipalComponent } from './ventana-principal/ventana-principal.component';
import { CategoriasComponent } from './ingreso-categoria/categorias.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UbicacionesComponent } from './ubicacion/ubicaciones.component';
import { FormUbicacionesComponent } from './ubicacion/form-ubicaciones.component';

import { PaginaAdminComponent } from './Pagina-Admin/pagina-admin.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {FormComponent}from './ingreso-categoria/form.component';
import { PerfilUsuariosComponent } from './PerfilUsuarios/perfil-usuario.component';
import { FormBienesComponent } from './bienes/form-bienes.component';
import { BienesComponent } from './bienes/bienes.component';
import { PropietarioComponent } from './propietarios/propietario.component';
import { FormPropietariosComponent } from './propietarios/form-propietarios.component';
import { DataStorageService } from './PerfilUsuarios/data-storage.service'; 
import { FormAsignacionComponent } from './bienes/form-asignacion.component';
import { BienescustodioComponent } from './bienescustodio/bienescustodio.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HistorialComponent } from './historial/historial.component'; 
import { FormRolComponent } from './rol/formrol.component';
import { AdminPrincipal1Component } from './admin-principal/admin-principal.component';
import { HeaderSuperComponent } from './headerSuper/headerSuper.component';
import {RolComponent} from './rol/rol.component';
import { ActaComponent } from './Acta/acta';
import {historialActaComponent} from './historial/historial.acta';
import { ActaPerdidoComponent } from './bienes/acta-perdido.component';

const routes: Routes = [
  { path:'', redirectTo: '', pathMatch: 'full' },
  { path:'', component: VentanaPrincipalComponent},
  { path:'ubicaciones', component: UbicacionesComponent },
  { path:'registro',component:RegistroComponent},
  { path:'login',component:IniciarSesionComponent},
  { path:'paginaadmin', component:PaginaAdminComponent},
  { path:'categorias', component:CategoriasComponent},
  { path:'categoria/form', component:FormComponent},
  { path:'categoria/form/:cat_cod', component: FormComponent },
  { path:'perfil', component:PerfilUsuariosComponent},
  { path:'bienes', component: BienesComponent},
  { path:'bienes/form', component: FormBienesComponent},
  { path:'bienes/form/:bien_cod', component: FormBienesComponent},
  { path:'bienes/form-asignar/:bien_cod', component: FormAsignacionComponent},
  { path:'propietario', component:PropietarioComponent},
  { path:'historial', component:HistorialComponent},
  { path:'proietario/form', component:FormPropietariosComponent},
  { path: 'propietario/form/:id', component: FormPropietariosComponent },
  {path: 'form-ubicaciones', component: FormUbicacionesComponent},
  {path: 'form-ubicaciones/:id', component: FormUbicacionesComponent},
  { path: 'biencustodio', component: BienescustodioComponent },
  {path:'ingresorol', component: RolComponent},
  {path:'rol/form', component: FormRolComponent},
  {path:'rol/form/:id', component: FormRolComponent},
  { path: 'superusuario', component: AdminPrincipal1Component },
  {path:'rol',component:RolComponent},
  {path:'acta',component:ActaComponent},
  {path:'historialActa',component:historialActaComponent},
  {path:'acta-perdidos', component: ActaPerdidoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistroComponent,
    VentanaPrincipalComponent,
    CategoriasComponent,
    PaginaAdminComponent,
    PerfilUsuariosComponent,
    HeaderComponent,
    HeaderSuperComponent,
    FormComponent,
    BienesComponent,
    FormBienesComponent,
    PropietarioComponent,
    FormPropietariosComponent,
    FormAsignacionComponent,
    HistorialComponent,
    UbicacionesComponent,
    FormUbicacionesComponent,
    BienescustodioComponent,
    FilterPipe,
    RegistroUsuarioComponent,
    AdminPrincipal1Component,
    FormRolComponent,
    RolComponent,
    FooterComponent,
    ActaComponent,
    historialActaComponent,
    ActaPerdidoComponent,

  ],
  imports: [BrowserModule, RouterModule.forRoot(routes),HttpClientModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
