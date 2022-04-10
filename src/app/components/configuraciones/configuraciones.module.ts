import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
import { ConfiguracionesComponent } from './configuraciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NumeracionDocumentoService } from './numeraciondocumento/NumeracionDocumentoService.service';
import { ImpuestoService } from './impuesto/ImpuestoService.service';
import { TipoImpuestoService } from './tipoimpuesto/TipoImpuestoService.service';
import { CatalogoImpuestoComponent } from './impuesto/catalogo-impuesto/catalogo-impuesto.component';
import { CrearImpuestoComponent } from './impuesto/crear-impuesto/crear-impuesto.component';
import { CrearTipoImpuestoModalComponent } from './tipoimpuesto/crear-tipo-impuesto-modal/crear-tipo-impuesto-modal.component';
import { CrearNumeraciondocumentoComponent } from './numeraciondocumento/crear-numeraciondocumento/crear-numeraciondocumento.component';
import { CatalogoNumeraciondocumentoComponent } from './numeraciondocumento/catalogo-numeraciondocumento/catalogo-numeraciondocumento.component';
import { CatalogoTipoImpuestoComponentComponent } from './tipoimpuesto/catalogo-tipo-impuesto-component/catalogo-tipo-impuesto-component.component';
import { CrearTipoImpuestoComponentComponent } from './tipoimpuesto/crear-tipo-impuesto-component/crear-tipo-impuesto-component.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { TipoDocumentoService } from './tipodocumento/TipoDocumentoService.service';
import { CatalogoNegocioComponent } from './negocio/catalogo-negocio/catalogo-negocio.component';
import { CrearNegocioComponent } from './negocio/crear-negocio/crear-negocio.component';
import { UsuarioService } from './usuario/UsuarioService.service';
import { CatalogoUsuarioComponent } from './usuario/catalogo-usuario/catalogo-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { CrearRolesComponent } from './roles/crear-roles/crear-roles.component';
import { CrearAsignarRolesComponent } from './roles/crear-asignar-roles/crear-asignar-roles.component';
import { CatalogoRolesComponent } from './roles/catalogo-roles/catalogo-roles.component';


@NgModule({
  declarations:
    [
      ConfiguracionesComponent,
      CatalogoImpuestoComponent,
      CrearImpuestoComponent,
      CrearTipoImpuestoModalComponent,
      CatalogoTipoImpuestoComponentComponent,
      CrearTipoImpuestoComponentComponent,
      CrearNumeraciondocumentoComponent,
      CatalogoNumeraciondocumentoComponent,
      CatalogoNegocioComponent,
      CrearNegocioComponent,
      CatalogoUsuarioComponent,
      CrearUsuarioComponent,
      CatalogoRolesComponent,
      CrearRolesComponent,
      CrearAsignarRolesComponent
    ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    ButtonsModule.forRoot()


  ],
  providers: [
    NumeracionDocumentoService,
    ImpuestoService,
    TipoImpuestoService,
    TipoDocumentoService,
    UsuarioService,
    BsModalRef
  ]
})
export class ConfiguracionesModule { }
