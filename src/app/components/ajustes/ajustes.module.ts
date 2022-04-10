import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { AjustesComponent } from './ajustes.component';
import { CrearMarcaModalComponent } from './marca/crear-marca-modal/crear-marca-modal.component';
import { CatalogoFormapagoComponent } from './formapago/catalogo-formapago/catalogo-formapago.component';
import { CrearFormapagoComponent } from './formapago/crear-formapago/crear-formapago.component';
import { CrearFormapagoModalComponent } from './formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FilterFormapagoPipe } from './formapago/catalogo-formapago/filter-formapago.pipe';
import { CatalogoUnidadmedidaComponent } from './unidad/catalogo-unidadmedida/catalogo-unidadmedida.component';
import { FilterUnidadmedidaPipe } from './unidad/catalogo-unidadmedida/filter-unidadmedida.pipe';
import { CrearUnidadModalComponent } from './unidad/crear-unidad-modal/crear-unidad-modal.component';
import { CrearMarcaComponent } from './marca/crear-marca/crear-marca.component';
import { CatalogoMarcaComponent } from './marca/catalogo-marca/catalogo-marca.component';
import { UnidadService } from './unidad/UnidadService.service';
import { FormaPagoService } from './formapago/FormaPagoService.service';
import { MarcaService } from './marca/MarcaService.service';
import { DepartamentoService } from './departamento/DepartamentoService.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations:
  [
    AjustesComponent,
    CrearMarcaModalComponent,
    CatalogoFormapagoComponent,
    CrearFormapagoComponent,
    CrearFormapagoModalComponent,
    FilterFormapagoPipe,
    CatalogoUnidadmedidaComponent,
    FilterUnidadmedidaPipe,
    CrearUnidadModalComponent,
    CrearMarcaComponent,
    CatalogoMarcaComponent,
  ],

  imports: [
    CommonModule,
    AjustesRoutingModule,
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

    UnidadService,
    FormaPagoService,
    MarcaService,
    DepartamentoService
  ]
})
export class AjustesModule { }
