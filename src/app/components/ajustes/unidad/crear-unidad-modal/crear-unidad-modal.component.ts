import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UnidadService } from '../UnidadService.service';


@Component({
  selector: 'app-crear-unidad-modal',
  templateUrl: './crear-unidad-modal.component.html',
  styleUrls: ['./crear-unidad-modal.component.css']
})
export class CrearUnidadModalComponent implements OnInit {
  id = 0;
  public onClose: Subject<boolean>;
  loading = false;
  formunidad: FormGroup;
  idnegocio: number;

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  constructor(private unidadService: UnidadService,   
    private bsModalRef: BsModalRef,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {

      this.buildForm();
      this.idnegocio = 1;
     }

  ngOnInit(): void {
    this.onClose = new Subject();
  }
  guardarUnidad(event: Event) {
    event.preventDefault();
    this.loading = true;
    const value = this.formunidad.value;
    this.unidadService.guardarUnidad(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.loading = false;
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
       // this.router.navigate(['inventario/listarcategorias']);
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


  private buildForm() {
    this.formunidad = this.formbuilder.group({
      abrevunidadmedida: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nomunidadmedida: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      status: ['1', [Validators.required]]

    });
  }

  get nomunidadmedida() {
    return this.formunidad.get('nomunidadmedida');
  }
  get abrevunidadmedida() {
    return this.formunidad.get('abrevunidadmedida');
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
