import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Almacen } from 'src/app/components/model/Almacen.model';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen-modal',
  templateUrl: './crear-almacen-modal.component.html',
  styleUrls: ['./crear-almacen-modal.component.css']
})
export class CrearAlmacenModalComponent implements OnInit {

  public onClose: Subject<boolean>;
  id = 0;
  lstAlmacenes: any [] = [];
  loading = false;
  formalmacen: FormGroup;
  idnegocio: number;
  bodega: Almacen;
  operacion: string = 'GUARDAR';

  camposrequeridos: string;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  parrterdireccion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\%\-\_\#\/\°]*$/;
  Objetoestado: string = 'Activo';

  constructor(private bsModalRef: BsModalRef,
              private almacenServicio: AlmacenService,
           
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
                this.idnegocio = 1;
                this.buildForm();
  }

  ngOnInit(): void {
    this.onClose = new Subject();
  }
  guardarAlmacen(event: Event) {
    event.preventDefault();
    const value = this.formalmacen.value;


    this.almacenServicio.guardarAlmacen(this.id, this.idnegocio, value)
      .subscribe(response => {
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        //this.router.navigate(['main/dashboard/portafolio/listaralmacenes']);
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

  private buildForm() {

    this.formalmacen = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      direccion: ['', [Validators.required, Validators.pattern(this.parrterdireccion)]],
      principal: [Number('0') === 1 ? true : false, [Validators.required]],
      status: [1, [Validators.required]]
    });
    this.Objetoestado = this.formalmacen.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }



  onChange(event: MatSlideToggleChange) {

    this.formalmacen.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formalmacen.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }


  onChangePrincipal(event: any) {
    this.formalmacen.get('principal').setValue(event.currentTarget.checked === true ? 1 : 0);
  }

 
  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();

  }
  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  get nombre() {
    return this.formalmacen.get('nombre');
  }

  get direccion() {
    return this.formalmacen.get('direccion');
  }
get principal(){
  return this.formalmacen.get('principal');
}
}
