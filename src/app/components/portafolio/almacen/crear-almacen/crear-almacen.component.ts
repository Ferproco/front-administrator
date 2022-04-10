import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Almacen } from 'src/app/components/model/Almacen.model';
import { AlmacenService } from '../AlmacenService.service';

@Component({
  selector: 'app-crear-almacen',
  templateUrl: './crear-almacen.component.html',
  styleUrls: ['./crear-almacen.component.css']
})

export class CrearAlmacenComponent implements OnInit {
  id = 0;
  lstAlmacenes: any [] = [];
  loading = false;
  
  idnegocio: number;
  formalmacen: FormGroup;
  camposrequeridos: string;
  AlmacenModel: Almacen;
 

  acciondeltitulo: string = 'Crear';
  Objetoestado: string = 'Activo';
  objetoimagen:string= 'fa fa-plus-square-o';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  
  customClass = 'customClass';
  isFirstOpen = true;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\%\-\_]*$/;
  parrterdireccion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\%\-\_\#\/\°]*$/;
  constructor(private almacenServicio: AlmacenService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
               
                this.AlmacenModel = new Almacen();
                this.idnegocio = 1;
            
                this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
                if (this.route.snapshot.params.id) {
                  this.id = this.route.snapshot.params.id;
                  this.acciondeltitulo = 'Modificar';
                  this.objetoimagen='fa fa-edit';
                 // this.buscarArticulo(this.id);
                }
                this.buildForm();
    }

  ngOnInit(): void {
    this.buscarAlmacen(this.id);
  }

  guardarAlmacen(event: Event) {
    event.preventDefault();
    const value = this.formalmacen.value;

    this.almacenServicio.guardarAlmacen(this.id, this.idnegocio,value)
      .subscribe(response => {
        this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
        this.router.navigate(['main/dashboard/portafolio/listaralmacenes']);
  
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
      nombre: [this.AlmacenModel.nombre, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      direccion: [this.AlmacenModel.direccion, [Validators.required, Validators.pattern(this.parrterdireccion)]],
      ubicacion:[this.AlmacenModel.ubicacion, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      principal: [Number(this.AlmacenModel.principal) === 1 ? true : false, [Validators.required]],
      status: [this.AlmacenModel.status === 'Activo' ? 1: 0, [Validators.required]]

    });

    this.Objetoestado = this.formalmacen.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }
  buscarAlmacen(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.almacenServicio.mostrarAlmacen(id)
      .subscribe(response => {
        this.AlmacenModel = response as any;
        if (this.AlmacenModel.status === 'Activo') {
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
    Object.keys(this.formalmacen.controls).forEach(key => {
      if (this.formalmacen.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }
  get nombre() {
    return this.formalmacen.get('nombre');
  }
  get ubicacion() {
    return this.formalmacen.get('ubicacion');
  }
  get direccion() {
    return this.formalmacen.get('direccion');
  }
  onChange(event: MatSlideToggleChange) {

    this.formalmacen.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formalmacen.get('status').value === 1 ? 'Activo' : 'Inactivo';    
  }


  onChangePrincipal(event: any) {
    this.formalmacen.get('principal').setValue(event.currentTarget.checked === true ? 1 : 0);
  }
}
