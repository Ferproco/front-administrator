import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPago } from 'src/app/components/model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

@Component({
  selector: 'app-crear-formapago',
  templateUrl: './crear-formapago.component.html',
  styleUrls: ['./crear-formapago.component.css']
})
export class CrearFormapagoComponent implements OnInit {

  /*
  VARIABLE DE ENTRADA QUE SE LA PASA EL CATALOGO PARA BUSCAR LA FORMA DE PAGO
  */

  id = 0;
  loading = false;
  formformapago: FormGroup;
  idnegocio: number;
  formapago: FormaPago;
  acciondeltitulo: string = 'Crear';
  objetoimagen: string = 'fa fa-plus-square-o';
  Objetoestado: string = 'Activo';

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  constructor(private formapagoService: FormaPagoService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {

    this.idnegocio = 1;
    this.formapago = new FormaPago(0, '', 0, this.idnegocio, 1);
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      this.buscarFormaPago(this.id);
      this.acciondeltitulo = 'Modificar';
      this.objetoimagen = 'fa fa-edit';
    }


  }

  ngOnInit(): void {
    this.buildForm(this.formapago);
  }

  public buildForm(formapago: FormaPago) {
    this.formformapago = this.formbuilder.group({
      nombre: [formapago.nombre, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      dias: [formapago.dias, [Validators.required, Validators.pattern(this.paterhombre)]],
      status: [formapago.status, [Validators.required]]
    });
    this.Objetoestado = this.formformapago.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  buscarFormaPago(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.formapagoService.mostrarFormaPago(id)
      .subscribe(response => {
        const forma = response as any;
        this.formapago = new FormaPago(forma.id, forma.nombre, forma.dias, this.idnegocio, status);
        this.buildForm(this.formapago);
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

    this.formformapago.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formformapago.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  guardarFormaPago(event: Event) {
    event.preventDefault();
    const controls = this.formformapago.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formformapago.valid) {
      this.loading = true;
      const value = this.formformapago.value; 
      this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value)
        .subscribe(response => {
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/ajustes/listarformaspagos']);
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

  get nombre() {
    return this.formformapago.get('nombre');
  }
  get dias() {
    return this.formformapago.get('dias');
  }

  get status() {
    return this.formformapago.get('status');
  }

}
