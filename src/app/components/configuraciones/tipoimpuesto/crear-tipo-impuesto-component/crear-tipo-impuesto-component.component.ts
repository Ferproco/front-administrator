import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoImpuestoService } from '../TipoImpuestoService.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoImpuesto } from 'src/app/components/model/TipoImpuesto.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-tipo-impuesto-component',
  templateUrl: './crear-tipo-impuesto-component.component.html',
  styleUrls: ['./crear-tipo-impuesto-component.component.css']
})
export class CrearTipoImpuestoComponentComponent implements OnInit {

  idtipoimpuesto = 0;
  loading = false;
  formimpuesto: FormGroup;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  acciondeltitulo: string = 'Crear';
  Objetoestado: string = 'Activo';
  objetoimagen: string = 'fa fa-plus-square-o';

  TipoImpuestoModel: TipoImpuesto;
  camposrequeridos: string;

  constructor(private tipoImpuestoService: TipoImpuestoService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService) {

    this.TipoImpuestoModel = new TipoImpuesto();

    if (this.route.snapshot.params.id) {
      this.idtipoimpuesto = this.route.snapshot.params.id;
      this.acciondeltitulo = 'Modificar';
      this.objetoimagen = 'fa fa-edit';
      // this.buscarArticulo(this.id);
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.buscarTipoImpuesto(this.idtipoimpuesto );
  }

  private buildForm() {
    this.formimpuesto = this.formbuilder.group({
      nombretipoimpuesto: [this.TipoImpuestoModel.nombretipoimpuesto, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      status: [this.TipoImpuestoModel.status === 'Activo' ? 1 : 0, [Validators.required]]

    });
    this.Objetoestado = this.formimpuesto.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  buscarTipoImpuesto(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.tipoImpuestoService.mostrarTipoImpuesto(id)
      .subscribe(response => {
        this.TipoImpuestoModel = response as any;
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

  get nombretipoimpuesto() {
    return this.formimpuesto.get('nombretipoimpuesto');
  }

  onChange(event: MatSlideToggleChange) {

    this.formimpuesto.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formimpuesto.get('status').value === 1 ? 'Activo' : 'Inactivo';
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
      this.tipoImpuestoService.guardarTipoImpuesto(this.idtipoimpuesto, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/configuraciones/listartipoimpuestos']);
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

  cargarRequeridos(e) {
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formimpuesto.controls).forEach(key => {
      if (this.formimpuesto.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }
}
