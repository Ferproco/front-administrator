

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarseComponent } from './components/auth/registrarse/registrarse.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { GrupoArticuloService } from './components/grupoarticulo/GrupoArticuloService.service';
import { MovimientosCajaService } from './components/movimientoscaja/MovimientosCajaService.service';
import { CatalogoMovimientoscajaComponent } from './components/movimientoscaja/catalogo-movimientoscaja/catalogo-movimientoscaja.component';
import { ProveedorService } from './components/proveedor/ProveedorService.service';
import { CrearProveedorComponent } from './components/proveedor/crear-proveedor/crear-proveedor.component';
import { CatalogoProveedorComponent } from './components/proveedor/catalogo-proveedor/catalogo-proveedor.component';
import { FilterProveedorPipe } from './components/proveedor/catalogo-proveedor/filter-proveedor.pipe';
import { CuentasxcobrarComponent } from './components/ventas/cuentasxcobrar/cuentasxcobrar.component';
import { TransaccionesService } from './components/inventarios/TransaccionesService.service';
import { FilterTransaccionesPipe } from './components/inventarios/catalogo-transacciones/filter-transacciones.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MunicipioService } from './components/municipio/MunicipioService.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ListaPrecioService } from './components/listapeccio/ListaPrecioService.service';
import { MensajeEliminarComponent } from './components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentosVentasService } from './components/ventas/documentos-ventas.service';
import { DocumentoCompraService } from './components/compras/DocumentoCompraService.service';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginService } from './components/auth/login/LoginService.service';
import { StorageService } from './components/auth/login/StorageService.service';
import { NegocioService } from './components/configuraciones/negocio/NegocioService.service';
import { RolesService } from './components/configuraciones/roles/RolesService.service';
import { ExportAsExcelFileService } from './components/util/export-as-excel-file.service';
import { DepartamentoService } from './components/ajustes/departamento/DepartamentoService.service';
import { MensajeGuardarDocumentoventaComponent } from './components/mensajeria/mensaje-guardar-documentoventa/mensaje-guardar-documentoventa.component';


export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "$",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    CatalogoMovimientoscajaComponent,
    CrearProveedorComponent,
    CatalogoProveedorComponent,
    FilterProveedorPipe,
    CuentasxcobrarComponent,
    FilterTransaccionesPipe,
    MensajeEliminarComponent,
    MensajeGuardarDocumentoventaComponent,
   // DocumentosComprasComponent
   // CatalogoDocumentosComprasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
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
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    MatSlideToggleModule,
    MatProgressBarModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)

  ],
  providers: [
    GrupoArticuloService,
    MovimientosCajaService,
    ProveedorService,
    TransaccionesService,
    DepartamentoService,
    MunicipioService,
    ListaPrecioService,
    DocumentosVentasService,
    DocumentoCompraService,
    LoginService,
    StorageService,
    NegocioService,
    RolesService,
    BsModalRef,
    ExportAsExcelFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
