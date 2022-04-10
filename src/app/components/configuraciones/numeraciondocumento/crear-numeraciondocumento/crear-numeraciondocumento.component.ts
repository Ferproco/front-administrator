import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/components/auth/login/StorageService.service';
import { NumeracionDocumento } from 'src/app/components/model/NumeracionDocumento.model';
import { TipoDocumento } from 'src/app/components/model/TipoDocumento.model';
import { ConfiguracionesModule } from '../../configuraciones.module';
import { TipoDocumentoService } from '../../tipodocumento/TipoDocumentoService.service';
import { NumeracionDocumentoService } from '../NumeracionDocumentoService.service';

@Component({
  selector: 'app-crear-numeraciondocumento',
  templateUrl: './crear-numeraciondocumento.component.html',
  styleUrls: ['./crear-numeraciondocumento.component.css']
})
export class CrearNumeraciondocumentoComponent implements OnInit {

  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  camposrequeridos: string;

  id = 0;
  lstTipoDocumentos: any[] = [];
  loading = false;
  formnumeraciondocumento: FormGroup;
  idnegocio: number;
  codpais: number;

  tipodocument;

  acciondeltitulo: string = 'Crear';
  Objetoestado: string = 'Activo';
  objetoimagen: string = 'fa fa-plus-square-o';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  NumeracionDocumentoModel: NumeracionDocumento;
  bsModalRef: BsModalRef;

  nombrelogicodocumento: string;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private tipodocumentoServicio: TipoDocumentoService,
              private numeraciondocumentoService: NumeracionDocumentoService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: BsModalService,
              private storageService: StorageService) {

    this.NumeracionDocumentoModel = new NumeracionDocumento();
    this.idnegocio = 1;
    this.codpais = storageService.getCurrentPais();
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      this.acciondeltitulo = 'Modificar';
      this.objetoimagen = 'fa fa-edit';
      // this.buscarArticulo(this.id);
    }
    this.buildForm();
  }

  ngOnInit(): void {

    this.listarTipoDocumentos();
    this.buscarNumeracionDocumento(this.id);
  }

  private buildForm() {

    this.formnumeraciondocumento = this.formbuilder.group({
      nombre: [this.NumeracionDocumentoModel.nombre, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      proximonumerodocumento: [this.NumeracionDocumentoModel.proximonumerodocumento, [Validators.required, Validators.pattern(this.paterhombre)]],
      desdenumero: [this.NumeracionDocumentoModel.desdenumero, [Validators.required, Validators.pattern(this.paterhombre)]],
      hastanumero: [this.NumeracionDocumentoModel.hastanumero, [Validators.required, Validators.pattern(this.paterhombre)]],
      prefijo: [this.NumeracionDocumentoModel.prefijo, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      codtipodocumento: [this.NumeracionDocumentoModel.codtipodocumento, [Validators.required]],
      resolucion: [this.NumeracionDocumentoModel.resolucion, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      principal: [this.NumeracionDocumentoModel.principal],
      status: [this.NumeracionDocumentoModel.status === 'Activo' ? 1 : 0, [Validators.required]],
      tipodedocumento: [this.NumeracionDocumentoModel.tipodedocumento]
    });
    this.Objetoestado = this.formnumeraciondocumento.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  guardarNumeracionDocumento(event: Event) {

    event.preventDefault();
    const controls = this.formnumeraciondocumento.controls;
    let proximonumerodocumento = this.formnumeraciondocumento.get('proximonumerodocumento');
    let resolucion = this.formnumeraciondocumento.get('resolucion');    
    const value = this.formnumeraciondocumento.value;
    const idtipo = Number(value.codtipodocumento);
    if (idtipo !== 1 && idtipo !== 7)
    { 
      proximonumerodocumento.clearValidators();     
      resolucion.clearValidators();     
    }
    else{
      proximonumerodocumento.setValidators([Validators.required, Validators.pattern(this.paterhombre)]);
      resolucion.setValidators([Validators.required, Validators.pattern(this.parrterobservaciones)]);
    }
    proximonumerodocumento.markAsDirty();
    proximonumerodocumento.updateValueAndValidity()

    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });

    if (this.formnumeraciondocumento.valid) {
      this.loading = true;
      this.numeraciondocumentoService.guardarNumeracionDocumento(this.id, this.idnegocio, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/configuraciones/listarnumeraciondocumentos']);
        },
          ((error: HttpErrorResponse) => {
            this.loading = false;
            console.log('Error ' + error);
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }));
    }
    else {
      this.toastr.error('Opss faltan datos que son obligatorios ', 'Error', { enableHtml: true, closeButton: true });
    }
  }

  listarTipoDocumentos() {
    this.loading = true;
    this.tipodocumentoServicio.listarTipoDocumentos()
      .subscribe(response => {
        let lista = response as any[];  
        this.lstTipoDocumentos = lista.filter(tipo => tipo.codpais === this.codpais); 
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }

  
  onChange(event: MatSlideToggleChange) {

    this.formnumeraciondocumento.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formnumeraciondocumento.get('status').value === 1 ? 'Activo' : 'Inactivo';

  }

  buscarNumeracionDocumento(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.numeraciondocumentoService.mostrarNumeracionDocumento(id)
      .subscribe(response => {
        this.NumeracionDocumentoModel = response as any;
        if (this.NumeracionDocumentoModel.status === 'Activo') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.buildForm();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));

  }

  cargarRequeridos(e) {
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formnumeraciondocumento.controls).forEach(key => {
      if (this.formnumeraciondocumento.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

  onChangeSelect(event: any) {
  
    var objList = this.lstTipoDocumentos.filter(x=>x.idtipodocumento == event.target.value)[0] as TipoDocumento;
    this.tipodocument = objList.nombre;
  } 

  get nombre() {
    return this.formnumeraciondocumento.get('nombre');
  }

  get tipodedocumento() {
    return this.formnumeraciondocumento.get('tipodedocumento');
  }

  get proximonumerodocumento() {
    return this.formnumeraciondocumento.get('proximonumerodocumento');
  }

  get desdenumero() {
    return this.formnumeraciondocumento.get('desdenumero');
  }

  get hastanumero() {
    return this.formnumeraciondocumento.get('hastanumero');
  }
  get prefijo() {
    return this.formnumeraciondocumento.get('prefijo');
  }
  get resolucion() {
    return this.formnumeraciondocumento.get('resolucion');
  }
  get codtipodocumento() {
    return this.formnumeraciondocumento.get('codtipodocumento');
  }

}
