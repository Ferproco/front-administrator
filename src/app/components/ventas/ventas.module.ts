import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentoVentasComponent } from './documento-ventas/documento-ventas.component';
import { CatalogoDocumentoVentasComponent } from './catalogo-documento-ventas/catalogo-documento-ventas.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';

import { MatMenuModule } from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContactoService } from '../portafolio/contacto/ContactoService.service';
import { VendedorService } from '../portafolio/vendedor/VendedorService.service';
import { AlmacenService } from '../portafolio/almacen/AlmacenService.service';
import { Articulo } from '../model/Articulo.model';
import { ArticuloService } from '../portafolio/articulo/ArticuloService.service';
import { NumeracionDocumentoService } from '../configuraciones/numeraciondocumento/NumeracionDocumentoService.service';
import { ImpuestoService } from '../configuraciones/impuesto/ImpuestoService.service';
import { TipoDocumentoService } from '../configuraciones/tipodocumento/TipoDocumentoService.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormaPagoService } from '../ajustes/formapago/FormaPagoService.service';
import { UnidadService } from '../ajustes/unidad/UnidadService.service';


@NgModule({
  declarations: [
    VentasComponent,
    DocumentoVentasComponent,
    CatalogoDocumentoVentasComponent


  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    MatDatepickerModule,
   // MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    ButtonsModule.forRoot()


  ],
  providers: [

    ContactoService,
    VendedorService,
    AlmacenService,
    NumeracionDocumentoService,
    ImpuestoService,
    ArticuloService,
    TipoDocumentoService,
    FormaPagoService,
    UnidadService

  ]
})
export class VentasModule { }
