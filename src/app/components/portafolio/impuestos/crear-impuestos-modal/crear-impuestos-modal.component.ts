import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ImpuestoService } from 'src/app/components/configuraciones/impuesto/ImpuestoService.service';
import { CrearTipoImpuestoModalComponent } from 'src/app/components/configuraciones/tipoimpuesto/crear-tipo-impuesto-modal/crear-tipo-impuesto-modal.component';
import { TipoImpuestoService } from 'src/app/components/configuraciones/tipoimpuesto/TipoImpuestoService.service';

@Component({
  selector: 'app-crear-impuestos-modal',
  templateUrl: './crear-impuestos-modal.component.html',
  styleUrls: ['./crear-impuestos-modal.component.css']
})
export class CrearImpuestosModalComponent implements OnInit {
  idimpuesto = 0;
  public onClose: Subject<boolean>;
  lstTipoImpuestos: any [] = [];
  loading = false;
  formimpuestos: FormGroup;
  idnegocio: number;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\%\-\_]*$/;
  constructor(private tipoimpuestoServicio: TipoImpuestoService,
    private impuestoService: ImpuestoService,
    private bsModalRef: BsModalRef,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService:BsModalService,
    private router: Router) {
      this.buildForm();
      this.idnegocio = 1;
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
     }

  ngOnInit(): void {
    this.listarTipoImpuestos();
    this.onClose = new Subject();
  }
  guardarImpuesto(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formimpuestos.value;
    this.impuestoService.guardarImpuesto(this.idimpuesto, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
    //  this.router.navigate(['configuracion/listarimpuestos']);
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
  private buildForm(){
    this.formimpuestos = this.formbuilder.group({
      nombreimpuesto: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      normal: ['0', [Validators.required, Validators.pattern(this.paterhombre)]],
      fechaini: [new Date(this.currentDate.setDate(this.currentDate.getDate())), [Validators.required]],
      idtipoimpuesto: [null, [Validators.required]],
      status: ['1', [Validators.required]]

    });
  }
  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  get normal() {
    return this.formimpuestos.get('normal');
  }
  get nombreimpuesto() {
    return this.formimpuestos.get('nombreimpuesto');
  }


  listarTipoImpuestos() {
    this.loading = true;
    this.tipoimpuestoServicio.listarTipoImpuestos()
      .subscribe(response => {
        this.lstTipoImpuestos = response as any[];
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
  onCrearTipoImpuesto(){
    this.bsModalRef = this.modalService.show(CrearTipoImpuestoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result){
        this.listarTipoImpuestos();
      }

    });
  }

}
