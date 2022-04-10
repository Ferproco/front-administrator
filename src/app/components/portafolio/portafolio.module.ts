import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PortafolioRoutingModule } from './portafolio-routing.module';
import { PortafolioComponent } from './portafolio.component';
import { CatalogoArticuloComponent } from './articulo/catalogo-articulo/catalogo-articulo.component';
import { ContactoService } from './contacto/ContactoService.service';
import { ArticuloService } from './articulo/ArticuloService.service';
import { FilterArticuloPipe } from './articulo/catalogo-articulo/filter-articulo.pipe';
import { CatalogoCategoriaComponent } from './categoria/catalogo-categoria/catalogo-categoria.component';
import { CategoriaService } from './categoria/CategoriaService.service';
import { CrearContactoComponent } from './contacto/crear-contacto/crear-contacto.component';
import { FilterCategoriaPipe } from './categoria/catalogo-categoria/filter-categoria.pipe';
import { AlmacenService } from './almacen/AlmacenService.service';
import { FilterAlmacenPipe } from './almacen/catalogo-almacen/filter-almacen.pipe';
import { CatalogoAlmacenComponent } from './almacen/catalogo-almacen/catalogo-almacen.component';
import { CrearAlmacenComponent } from './almacen/crear-almacen/crear-almacen.component';
import { VendedorService } from './vendedor/VendedorService.service';
import { CatalogoVendedorComponent } from './vendedor/catalogo-vendedor/catalogo-vendedor.component';
import { CrearVendedorComponent } from './vendedor/crear-vendedor/crear-vendedor.component';
import { FilterVendedorPipe } from './vendedor/catalogo-vendedor/filter-vendedor.pipe';
import { CrearCategoriaComponent } from './categoria/crear-categoria/crear-categoria.component';
import { CatalogoContactosComponent } from './contacto/catalogo-contactos/catalogo-contactos.component';
import { TipoIdentificacionService } from './contacto/crear-contacto/TipoIdentificacionService.service';
import { TipoContribuyenteService } from './contacto/crear-contacto/TipoContribuyenteService.service';
import { PaisService } from './contacto/crear-contacto/PaisService.service';
import { CrearArticuloComponent } from './articulo/crear-articulo/crear-articulo.component';
import { ModalClienteComponent } from './contacto/modal-cliente/modal-cliente.component';
import { CatalogoArticuloModalComponent } from './articulo/catalogo-articulo-modal/catalogo-articulo-modal.component';
import { CrearCategoriaModalComponent } from './categoria/crear-categoria-modal/crear-categoria-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CatalogoEmpleadoComponent } from './empleado/catalogo-empleado/catalogo-empleado.component';
import { EmpleadoService } from './empleado/EmpleadoService.service';
import { CrearEmpleadoComponent } from './empleado/crear-empleado/crear-empleado.component';
import { Impuesto } from '../model/Impuesto.model';
import { ImpuestoService } from '../configuraciones/impuesto/ImpuestoService.service';
import { TipoImpuestoService } from '../configuraciones/tipoimpuesto/TipoImpuestoService.service';
import { CrearImpuestosModalComponent } from './impuestos/crear-impuestos-modal/crear-impuestos-modal.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CrearAlmacenModalComponent } from './almacen/crear-almacen-modal/crear-almacen-modal.component';
import { UnidadService } from '../ajustes/unidad/UnidadService.service';
import { MarcaService } from '../ajustes/marca/MarcaService.service';
import { FormaPagoService } from '../ajustes/formapago/FormaPagoService.service';


@NgModule({
  declarations:
  [
    PortafolioComponent,
    CatalogoArticuloComponent,
    CrearArticuloComponent,
    FilterArticuloPipe,
    CatalogoArticuloModalComponent,
    CatalogoContactosComponent,
    CrearContactoComponent,
    ModalClienteComponent,
    CatalogoCategoriaComponent,
    CrearCategoriaComponent,
    FilterCategoriaPipe,
    CrearCategoriaModalComponent,
    CatalogoAlmacenComponent,
    CrearAlmacenComponent,
    CrearAlmacenModalComponent,
    FilterAlmacenPipe,
    CatalogoVendedorComponent,
    CrearVendedorComponent,
    FilterVendedorPipe,
    CatalogoEmpleadoComponent,
    CrearEmpleadoComponent,
    CrearImpuestosModalComponent
  ],
  imports: [

    CommonModule,
    PortafolioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ColorPickerModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [
    AlmacenService,
    ArticuloService,
    CategoriaService,
    VendedorService,
    TipoIdentificacionService,
    TipoContribuyenteService,
    PaisService,
    EmpleadoService,
    ContactoService,
    ImpuestoService,
    TipoImpuestoService,
    UnidadService,
    MarcaService,
    FormaPagoService
  ]
})
export class PortafolioModule { }
