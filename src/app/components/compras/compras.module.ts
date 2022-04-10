import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './compras.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContactoService } from '../portafolio/contacto/ContactoService.service';
import { AlmacenService } from '../portafolio/almacen/AlmacenService.service';
import { NumeracionDocumentoService } from '../configuraciones/numeraciondocumento/NumeracionDocumentoService.service';
import { ImpuestoService } from '../configuraciones/impuesto/ImpuestoService.service';
import { ArticuloService } from '../portafolio/articulo/ArticuloService.service';
import { TipoDocumentoService } from '../configuraciones/tipodocumento/TipoDocumentoService.service';
import { VendedorService } from '../portafolio/vendedor/VendedorService.service';
import { CatalogoDocumentosComprasComponent } from './catalogo-documentos-compras/catalogo-documentos-compras.component';
import { DocumentosComprasComponent } from './documentos-compras/documentos-compras.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormaPagoService } from '../ajustes/formapago/FormaPagoService.service';
import { UnidadService } from '../ajustes/unidad/UnidadService.service';


@NgModule({
  declarations:
  [
    ComprasComponent,
    CatalogoDocumentosComprasComponent,
    DocumentosComprasComponent
  ],
  imports:
  [
    CommonModule,
    ComprasRoutingModule,
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
  ]
  ,
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
export class ComprasModule { }
