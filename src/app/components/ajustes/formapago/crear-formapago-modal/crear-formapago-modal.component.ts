import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormaPago } from 'src/app/components/model/FormaPago.model';
import { FormaPagoService } from '../FormaPagoService.service';

@Component({
  selector: 'app-crear-formapago-modal',
  templateUrl: './crear-formapago-modal.component.html',
  styleUrls: ['./crear-formapago-modal.component.css']
})


export class CrearFormapagoModalComponent implements OnInit {
  public onClose: Subject<boolean>;

  id = 0;
  loading = false;
  formformapago: FormGroup;
  idnegocio: number;
  formapago: FormaPago;
  operacion: string = 'GUARDAR';

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  constructor(private bsModalRef: BsModalRef,
              private formapagoService: FormaPagoService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService,
              private route: ActivatedRoute) {

                this.idnegocio = 1;
                this.formapago = new FormaPago(0, '', 0, this.idnegocio, 1);
                this.buildForm();

                }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public buildForm(){
    this.formformapago = this.formbuilder.group({

      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      dias: [0, [Validators.required, Validators.pattern(this.paterhombre)]],
      status: [1, [Validators.required]]
    });
  }

 /* public onConfirm(): void {
    const value = this.formformapago.value;

    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value, this.operacion)
    .subscribe(response => {
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.onClose.next(true);
      this.bsModalRef.hide();
    },
    ((error: HttpErrorResponse) => {
      this.loading = false;
 
      this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio  ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
    }));

  }*/

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();

  }
  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  guardarFormaPago(event: Event) {
    event.preventDefault();
    const value = this.formformapago.value;
    this.formapagoService.guardarFormaPago(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.onClose.next(true);
        this.bsModalRef.hide();
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

  get nombre() {
    return this.formformapago.get('nombre');
  }
  get dias() {
    return this.formformapago.get('dias');
  }

  get status() {
    return this.formformapago.get('status');
  }
  onChange($event) {
    this.formformapago.get('status').setValue($event.target.checked === true ? 1 : 0);
  }
}
