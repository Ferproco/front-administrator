import { ImpuestoService } from './../ImpuestoService.service';
import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CrearTipoImpuestoModalComponent } from '../../tipoimpuesto/crear-tipo-impuesto-modal/crear-tipo-impuesto-modal.component';
import { TipoImpuestoService } from '../../tipoimpuesto/TipoImpuestoService.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Impuesto } from 'src/app/components/model/Impuesto.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { StorageService } from 'src/app/components/auth/login/StorageService.service';

@Component({
  selector: 'app-crear-impuesto',
  templateUrl: './crear-impuesto.component.html',
  styleUrls: ['./crear-impuesto.component.css']
})
export class CrearImpuestoComponent implements OnInit {

  idimpuesto = 0;
  lstTipoImpuestos: any[] = [];
  loading = false;
  formimpuesto: FormGroup;
  idnegocio: number;
  ImpuestoModel: Impuesto;
  camposrequeridos: string;

  acciondeltitulo: string = 'Crear';
  Objetoestado: string = 'Activo';
  objetoimagen: string = 'fa fa-plus-square-o';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  codpais: number;
  bsModalRef: BsModalRef;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private tipoimpuestoServicio: TipoImpuestoService,
    private impuestoService: ImpuestoService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private storageService: StorageService) {

      this.codpais = storageService.getCurrentPais();
      this.ImpuestoModel = new Impuesto();
      this.idnegocio = 1;
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
      if (this.route.snapshot.params.id) {
        this.idimpuesto = this.route.snapshot.params.id;
        this.acciondeltitulo = 'Modificar';
        this.objetoimagen = 'fa fa-edit';
      // this.buscarArticulo(this.id);
      }
      this.buildForm();
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
  }

  ngOnInit(): void {
    this.listarTipoImpuestos();
    this.buscarImpuesto(this.idimpuesto);
  }

  guardarImpuesto(event: Event) {
    event.preventDefault();
    const controls = this.formimpuesto.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formimpuesto.valid) {
      this.loading = true;
      const value = this.formimpuesto.value;
      this.impuestoService.guardarImpuesto(this.idimpuesto, this.idnegocio, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/configuraciones/listarimpuestos']);
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
    else {
      this.toastr.error('Opss faltan datos que son obligatorios ', 'Error', { enableHtml: true, closeButton: true });
    }
  }

  listarTipoImpuestos() {
    this.loading = true;
    this.tipoimpuestoServicio.listarTipoImpuestos()
      .subscribe(response => {
        let lista = response as any[];  
        this.lstTipoImpuestos = lista.filter(tipo => tipo.codpais === this.codpais); 
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

  private buildForm() {
    this.formimpuesto = this.formbuilder.group({
      nombreimpuesto: [this.ImpuestoModel.nombreimpuesto, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      normal: [this.ImpuestoModel.normal, [Validators.required, Validators.pattern(this.paterhombre)]],
      fechaini: [new Date(this.currentDate.setDate(this.currentDate.getDate())), [Validators.required]],
      idtipoimpuesto: [this.ImpuestoModel.idtipoimpuesto, [Validators.required]],
      status: [this.ImpuestoModel.status === 'Activo' ? 1 : 0, [Validators.required]]

    });
    this.Objetoestado = this.formimpuesto.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  get normal() {
    return this.formimpuesto.get('normal');
  }
  get nombreimpuesto() {
    return this.formimpuesto.get('nombreimpuesto');
  }
  get idtipoimpuesto() {
    return this.formimpuesto.get('idtipoimpuesto');
  }

  buscarImpuesto(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.impuestoService.mostrarImpuesto(id)
      .subscribe(response => {
        this.ImpuestoModel = response as any;
        if (this.ImpuestoModel.status === 'Activo') {
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
  onChange(event: MatSlideToggleChange) {

    this.formimpuesto.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formimpuesto.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  onCrearTipoImpuesto() {
    this.bsModalRef = this.modalService.show(CrearTipoImpuestoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
 
      if (result) {
        this.listarTipoImpuestos();
      }

    });
  }
  cargarRequeridos(e) {
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formimpuesto.controls).forEach(key => {
      if (this.formimpuesto.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

}
