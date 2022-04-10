
import { Subject } from 'rxjs';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TipoImpuestoService } from '../TipoImpuestoService.service';

@Component({
  selector: 'app-crear-tipo-impuesto-modal',
  templateUrl: './crear-tipo-impuesto-modal.component.html',
  styleUrls: ['./crear-tipo-impuesto-modal.component.css']
})
export class CrearTipoImpuestoModalComponent implements OnInit {

  public onClose: Subject<boolean>;
  formTipo: FormGroup;

  loading = false;
  idnegocio: number;
  id: number;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  constructor(private bsModalRef: BsModalRef,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private TipoImpuestoService: TipoImpuestoService) {
this.buildForm();
                this.id = 0;
              }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  private buildForm() {
    this.formTipo = this.formbuilder.group({
      nombretipoimpuesto: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      status: ['1', [Validators.required]]
    });
  }

  guardarTipo(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formTipo.value;
    this.TipoImpuestoService.guardarTipoImpuesto(this.id, value)
      .subscribe(response => {
        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
       // this.router.navigate(['inventario/listarmarcas']);
        this.onClose.next(true);
        this.bsModalRef.hide();
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          console.log('Error ' + error);
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }));
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
