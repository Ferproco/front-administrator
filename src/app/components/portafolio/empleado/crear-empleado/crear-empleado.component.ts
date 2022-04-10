import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentoService } from 'src/app/components/ajustes/departamento/DepartamentoService.service';
import { Empleado } from 'src/app/components/model/Empleado.model';
import { MunicipioService } from 'src/app/components/municipio/MunicipioService.service';
import { PaisService } from '../../contacto/crear-contacto/PaisService.service';
import { TipoIdentificacionService } from '../../contacto/crear-contacto/TipoIdentificacionService.service';
import { EmpleadoService } from '../EmpleadoService.service';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  id = 0;
  loading = false;
  formempleado: FormGroup;
  lstTipoIdentificacion: any [] = [];
  lstPais: any [] = [];
  lstDepartamentos: any [] = [];
  lstMunicipios: any [] = [];
  idnegocio: number;
  idpais: number = null;


  EmpleadoModel: Empleado;

  condicionadoxdefecto = 0;

  visible = true;
  visiblenombres = false;
  visibleresponsabilidadtributaria = true;
  visibledepartamento = true;
  visiblemunicipio = true;
  visiblecodigodv = false;

  camposrequeridos: string;


  tipoempleado = [
    { id: 1, nombre: 'Vendedor' },
    { id: 2, nombre: 'Otro' }
  ];

  saleData = [
    { name: 'Compras', value: 105000 },
    { name: 'Ventas', value: 55000 }
  ];

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  bsModalRef: any;

  customClass = 'customClass';
  isFirstOpen = true;
  constructor(private empleadoServicio: EmpleadoService,
    private tipoidentificacionServicio: TipoIdentificacionService,
    private paisService: PaisService,
    private departamentoService: DepartamentoService,
    private municipioServicio: MunicipioService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {

      this.EmpleadoModel = new Empleado();
      this.idnegocio = 1;
      this.idpais = 48;
      this.EmpleadoModel.codpais = this.idpais;
      this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
      this.buildForm();
      if (this.route.snapshot.params.id){
        this.id = this.route.snapshot.params.id;
      }

     }

  ngOnInit(): void {
    this.listarTipoIdentificacion();
    this.listarPais();
    this.listarDepartamentos(this.EmpleadoModel.codpais);
    this.listarMunicipios(this.EmpleadoModel.coddepartamento);
    this.buscarEmpleado(this.id);
  }
  private buildForm(){

    this.formempleado = this.formbuilder.group({
      codtipoempleado: [this.EmpleadoModel.codtipoempleado, [Validators.required]],
      codtipoidentificacion: [this.EmpleadoModel.codtipoidentificacion, [Validators.required]],
      numeroidentificacion: [this.EmpleadoModel.numeroidentificacion, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombreprimero: [this.EmpleadoModel.nombreprimero, [Validators.pattern(this.parrterobservaciones)]],
      nombresegundo: [this.EmpleadoModel.nombresegundo, [Validators.pattern(this.parrterobservaciones)]],
      apellidoprimero: [this.EmpleadoModel.apellidoprimero, [Validators.pattern(this.parrterobservaciones)]],
      apellidosegundo: [this.EmpleadoModel.apellidosegundo, [Validators.pattern(this.parrterobservaciones)]],
      telefonomovil: [this.EmpleadoModel.telefonomovil, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo1: [this.EmpleadoModel.telefonofijo1, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo2: [this.EmpleadoModel.telefonofijo2, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofax: [this.EmpleadoModel.telefonofax, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      direccionfiscal: [this.EmpleadoModel.direccionfiscal, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      correoe: [this.EmpleadoModel.correoe, [Validators.pattern('^([^\\s]|\\s[^\\s])+$')]],
      fecharegistro: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codpais: [this.EmpleadoModel.codpais],
      coddepartamento: [this.EmpleadoModel.coddepartamento, [Validators.required]],
      codmunicipio: [this.EmpleadoModel.codmunicipio, [Validators.required]],
      codigodv: [this.EmpleadoModel.codigodv, [Validators.pattern(this.paterhombre)]],
      status: [this.EmpleadoModel.status === 'Activo' ? 1 : 0]
    });


  }

  buscarEmpleado(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.empleadoServicio.mostrarEmpleados(id)
      .subscribe(response => {
        this.EmpleadoModel = response as any;
        if (this.EmpleadoModel.status === 'Activo') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.listarDepartamentos(this.EmpleadoModel.codpais);
        this.listarMunicipios(this.EmpleadoModel.coddepartamento);
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

  guardarEmpleado(event: Event){
    event.preventDefault();
    this.loading = true;
    const value = this.formempleado.value;
    this.empleadoServicio.guardarEmpleado(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.router.navigate(['/main/dashboard/portafolio/listarempleados']);
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

  listarTipoIdentificacion() {
    this.loading = true;
    this.tipoidentificacionServicio.listarTipoIdentificaciones('')
      .subscribe(response => {
        this.lstTipoIdentificacion = response as any[];
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


  listarDepartamentos(event) {
    this.loading = true;
    this.lstDepartamentos = [];
    this.lstMunicipios = [];
    this.departamentoService.listarDepartamentosporPais('', Number(event))
      .subscribe(response => {
        this.lstDepartamentos = response as any[];
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


  listarMunicipios (event) {
    this.loading = true;
    this.lstMunicipios = [];
    this.municipioServicio.listarMunicipiosporDepartamento('', Number(event))
      .subscribe(response => {
        this.lstMunicipios = response as any[];
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

  listarPais() {
    this.loading = true;
    this.paisService.listarPais('')
      .subscribe(response => {
        this.lstPais = response as any[];
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



  MostrarCamposTipoPresona(event){
    const idtipo = Number(event);
    if (idtipo === 1){
      this.visiblenombres = true;
      this.visibleresponsabilidadtributaria = true;
    }
    else{
      this.visiblenombres = false;
      this.visibleresponsabilidadtributaria = true;
    }

  }

  CalcularDigitoVerficacion(event) {

    const arreglonumeros: number[] = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    let sinpuntos = event.replace(/\./g, '');
    let arreglonumeroidentificacion = event as any[];
    let resultadomultiplicacion = 0;
    let sumaresultadomultiplicacion = 0;
    const divisionnumero = 11;
    let resultadodivision = 0;
    let posicionarreglo1 = 0;
    let posicionarreglo2 = 0;
    let contador = 0;
    let arreglontemporal: any[] = [];
    // arreglonumeroidentificacion.replace('', '.');
    let longnumero = 0;
    if (sinpuntos.length < 15){
       longnumero = 15 - sinpuntos.length;

    let ceros='0';
    for (let i=1;i<longnumero;i++) {
      ceros+='0';
    }
    sinpuntos = ceros+sinpuntos;
    arreglonumeroidentificacion = sinpuntos;

    }
    for (let numero of arreglonumeros) {
      posicionarreglo1 = posicionarreglo1 + 1;
      posicionarreglo2 = 0;
      for (let element of arreglonumeroidentificacion) {

        posicionarreglo2 = posicionarreglo2 + 1;
        if (posicionarreglo1 === posicionarreglo2) {
          resultadomultiplicacion = numero * element;
          sumaresultadomultiplicacion = sumaresultadomultiplicacion + resultadomultiplicacion;
        }
      };

    }
    resultadodivision = sumaresultadomultiplicacion / divisionnumero;
    let parteDecimal = resultadodivision % 1; // Lo que sobra de dividir al número entre 1
    let parteEntera = resultadodivision - parteDecimal;

    let resultado = parteDecimal * divisionnumero;

    let resultadofinal = Math.round(resultado);
    let digitoverificacion = 0;
    if (resultadofinal === 0) {

      digitoverificacion = 0;

    }
    else if (resultadofinal === 1) {

      digitoverificacion = 1;

    }
    else {

      digitoverificacion = 11 - resultadofinal;
    }
    this.formempleado.get('codigodv').setValue(Number(digitoverificacion));
    this.condicionadoxdefecto = digitoverificacion;
  }

  get codtipoempleado(){
    return this.formempleado.get('codtipoempleado');
  }
  get nombreprimero() {
    return this.formempleado.get('nombreprimero');
  }
  get nombresegundo() {
    return this.formempleado.get('nombresegundo');
  }
  get apellidoprimero() {
    return this.formempleado.get('apellidoprimero');
  }
  get apellidosegundo() {
    return this.formempleado.get('apellidosegundo');
  }
  get numeroidentificacion() {
    return this.formempleado.get('numeroidentificacion');
  }
  get direccionfiscal() {
    return this.formempleado.get('direccionfiscal');
  }
  get telefonofijo1() {
    return this.formempleado.get('telefonofijo1');
  }
  get telefonofijo2() {
    return this.formempleado.get('telefonofijo2');
  }
  get telefonofax() {
    return this.formempleado.get('telefonofax');
  }
  get telefonomovil() {
    return this.formempleado.get('telefonomovil');
  }
  get correoe(){
    return this.formempleado.get('correoe');
  }



  onChange(event: MatSlideToggleChange) {
    this.formempleado.get('status').setValue(event.checked === true ? '1' : '0');
  }



  cargarRequeridos(e){
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formempleado.controls).forEach(key => {
      if (this.formempleado.controls[key].invalid){
        this.camposrequeridos += key + '\n';
      }
    });
  }

}
