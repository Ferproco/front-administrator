import { TipoContribuyenteService } from './TipoContribuyenteService.service';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactoService } from '../ContactoService.service';
import { TipoIdentificacionService } from './TipoIdentificacionService.service';
import { VendedorService } from '../../vendedor/VendedorService.service';
import { PaisService } from './PaisService.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ListaPrecioService } from 'src/app/components/listapeccio/ListaPrecioService.service';
import { Contacto } from 'src/app/components/model/Contacto.model';
import { MunicipioService } from 'src/app/components/municipio/MunicipioService.service';
import { FormaPagoService } from 'src/app/components/ajustes/formapago/FormaPagoService.service';
import { DepartamentoService } from 'src/app/components/ajustes/departamento/DepartamentoService.service';
import { CrearFormapagoModalComponent } from 'src/app/components/ajustes/formapago/crear-formapago-modal/crear-formapago-modal.component';
import { StorageService } from 'src/app/components/auth/login/StorageService.service';
import { TipoIdentificacion } from 'src/app/components/model/TipoIdentificacion.model';


export interface Tipopersona {
  id: number;
  nombre: string;

}

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})

export class CrearContactoComponent implements OnInit {

  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  Objetoestado: string = 'Activo';
  id = 0;
  loading = false;
  formcontacto: FormGroup;
  lstTipoIdentificacion: TipoIdentificacion[] = [];
  lstTipoContribuyente: any[] = [];
  lstVendedores: any[] = [];
  lstformaspago: any[] = [];
  lstPais: any[] = [];
  lstDepartamentos: any[] = [];
  lstMunicipios: any[] = [];
  idnegocio: number;
  idpais: number = null;
  lstListaprecios: any[] = [];

  ContactoModel: Contacto;

  condicionadoxdefecto = 0;

  visible = true;
  visiblenombres = false;
  visiblerazonsocial = true;
  visibleresponsabilidadtributaria = true;
  visibledepartamento = true;
  visiblemunicipio = true;
  visiblecodigodv = false;

  camposrequeridos: string;

  tipopersona: Tipopersona[] = [
    { id: 1, nombre: 'Persona Natural' },
    { id: 2, nombre: 'Persona Juridica' }
  ];

  codtipocontacto = [
    { id: 1, nombre: 'Cliente' },
    { id: 2, nombre: 'Proveedor' }
  ];

  saleData = [
    { name: 'Compras', value: 105000 },
    { name: 'Ventas', value: 55000 }
  ];

  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  paterhombre = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;
  parrterdireccion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\%\-\_\#\/\°]*$/;
  bsModalRef: any;

  customClass = 'customClass';
  isFirstOpen = true;

  constructor(private contactoServicio: ContactoService,
    private tipoidentificacionServicio: TipoIdentificacionService,
    private tipocontribuyenteServicio: TipoContribuyenteService,
    private formaPagoService: FormaPagoService,
    private vendedorService: VendedorService,
    private paisService: PaisService,
    private departamentoService: DepartamentoService,
    private municipioServicio: MunicipioService,
    private listaprecioServicio: ListaPrecioService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private storageService: StorageService) {


    this.ContactoModel = new Contacto();
    this.idnegocio = 1;
    this.idpais = storageService.getCurrentPais();    
    this.ContactoModel.codpais = this.idpais;
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    this.buildForm();
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
    }
  }

  ngOnInit(): void {

    this.listarTipoIdentificacion();
    this.listarTipoContribuyente();
    this.listarVendedores();
    this.listarFormasdepago();
    this.listarPais();
    this.listarListaPrecios();
    this.listarDepartamentos(this.ContactoModel.codpais);
    this.listarMunicipios(this.ContactoModel.coddepartamento);
    this.buscarContacto(this.id);
  }

  private buildForm() {

    this.formcontacto = this.formbuilder.group({
      codtipocontacto: [this.ContactoModel.codtipocontacto, [Validators.required]],
      codtipocontibuyente: [this.ContactoModel.codtipocontibuyente, [Validators.required]],
      codtipoidentificacion: [this.ContactoModel.codtipoidentificacion, [Validators.required]],
      numeroidentificacion: [this.ContactoModel.numeroidentificacion, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      nombreprimero: [this.ContactoModel.nombreprimero, [Validators.pattern(this.parrterobservaciones)]],
      nombresegundo: [this.ContactoModel.nombresegundo, [Validators.pattern(this.parrterobservaciones)]],
      apellidoprimero: [this.ContactoModel.apellidoprimero, [Validators.pattern(this.parrterobservaciones)]],
      apellidosegundo: [this.ContactoModel.apellidosegundo, [Validators.pattern(this.parrterobservaciones)]],
      razonsocial: [this.ContactoModel.razonsocial, [Validators.pattern(this.parrterobservaciones)]],
      telefonomovil: [this.ContactoModel.telefonomovil, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo1: [this.ContactoModel.telefonofijo1, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofijo2: [this.ContactoModel.telefonofijo2, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      telefonofax: [this.ContactoModel.telefonofax, [Validators.pattern(this.patten), Validators.maxLength(15)]],
      direccionfiscal: [this.ContactoModel.direccionfiscal, [Validators.required, Validators.pattern(this.parrterdireccion)]],
      correoe: [this.ContactoModel.correoe, [Validators.pattern('^([^\\s]|\\s[^\\s])+$')]],
      fecharegistro: [formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required]],
      codvendedor: [this.ContactoModel.codvendedor, [Validators.required]],
      codformapago: [this.ContactoModel.codformapago, [Validators.required]],
      codtipopersona: [this.ContactoModel.codtipopersona, [Validators.required]],
      codpais: [this.ContactoModel.codpais],
      coddepartamento: [this.ContactoModel.coddepartamento, [Validators.required]],
      codmunicipio: [this.ContactoModel.codmunicipio, [Validators.required]],
      lugarenvio: [this.ContactoModel.lugarenvio, [Validators.pattern(this.parrterobservaciones)]],
      codlistaprecio: [this.ContactoModel.codlistaprecio, [Validators.required]],
      direccionexogena: [this.ContactoModel.direccionfiscal, [Validators.pattern(this.parrterdireccion)]],
      paginaweb: [this.ContactoModel.paginaweb, [Validators.pattern(this.parrterobservaciones)]],
      limitecreditohasta: [this.ContactoModel.limitecreditohasta, [Validators.pattern(this.parrterobservaciones)]],
      fechacreditodesde: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      fechacreditohasta: [formatDate(new Date(), 'yyyy-MM-dd', 'en')],
      observaciones: [this.ContactoModel.observaciones, [Validators.pattern(this.parrterobservaciones)]],
      descuentocondicionado: [this.ContactoModel.descuentocondicionado, [Validators.pattern(this.parrterobservaciones)]],
      codigodv: [this.ContactoModel.codigodv, [Validators.pattern(this.paterhombre)]],
      /*responsableiva: [this.ContactoModel.responsableiva, [Validators.required]],*/
      status: [this.ContactoModel.status === 'Activo' ? 1 : 0]
    });
    this.Objetoestado = this.formcontacto.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  buscarContacto(id: number) {
    let status = 0;
    this.loading = true;
    const obj = this.contactoServicio.mostrarContactos(id)
      .subscribe(response => {
        this.ContactoModel = response as any;
        if (this.ContactoModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.listarDepartamentos(this.ContactoModel.codpais);
        this.listarMunicipios(this.ContactoModel.coddepartamento);
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

  guardarContacto(event: Event) {
    event.preventDefault();
    const controls = this.formcontacto.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formcontacto.valid) {
      this.loading = true;
      const value = this.formcontacto.value;
      this.contactoServicio.guardarContacto(this.id, this.idnegocio, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/portafolio/listarcontactos']);
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
      this.toastr.error('Opss faltan datos que son obligatorios ', 'Error',
        { enableHtml: true, closeButton: true });
    }
  }

  listarTipoIdentificacion() {
    this.loading = true;
    this.tipoidentificacionServicio.listarTipoIdentificaciones('')
      .subscribe(response => {
        let lista = response as any[];  
        this.lstTipoIdentificacion = lista.filter(tipo => tipo.codpais === this.idpais);
        if (this.lstTipoIdentificacion.length === 1){
          this.formcontacto.get('codtipoidentificacion').setValue(this.lstTipoIdentificacion[0].id);
          this.HabilitarDigitoVerificador(this.lstTipoIdentificacion[0].requieredigitoveroficador);  
        }
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

  listarTipoContribuyente() {
    this.loading = true;
    this.tipocontribuyenteServicio.listarTipoContribuyente('')
      .subscribe(response => {
        this.lstTipoContribuyente = response as any[];
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


  listarMunicipios(event) {
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
  listarVendedores() {
    this.loading = true;
    this.vendedorService.listarVendedores('')
      .subscribe(response => {
        this.lstVendedores = response as any[];
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

  listarFormasdepago() {
    this.loading = true;
    this.formaPagoService.listarFormaPagos('')
      .subscribe(response => {
        this.lstformaspago = response as any[];
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

  listarListaPrecios() {
    this.loading = true;
    this.listaprecioServicio.listarListaPrecios('')
      .subscribe(response => {
        this.lstListaprecios = response as any[];
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

  MostrarCampos(event) {
    const idtipo = Number(event);
    let objtipoidentificacion =  this.lstTipoIdentificacion.filter(t => t.id === idtipo);    
    this.HabilitarDigitoVerificador(objtipoidentificacion[0].requieredigitoveroficador);  

  }

HabilitarDigitoVerificador(habilitar: boolean){

  if (habilitar){
    this.visible = true;
    this.visiblenombres = false;
    this.visiblerazonsocial = true;
    this.visibleresponsabilidadtributaria = true;
    this.visiblemunicipio = true;
    this.visibledepartamento = true;
    this.visiblecodigodv = true;
  }
  else{
    this.visible = true;
    this.visiblenombres = true;
    this.visiblerazonsocial = false;
    this.visibleresponsabilidadtributaria = true;
    this.visiblemunicipio = true;
    this.visibledepartamento = true;
    this.visiblecodigodv = false;
  }
}

  MostrarCamposTipoPresona(event) {
    const idtipo = Number(event);
    if (idtipo === 1) {
      this.visiblenombres = true;
      this.visiblerazonsocial = false;
      this.visibleresponsabilidadtributaria = true;
    }
    else {
      this.visiblenombres = false;
      this.visiblerazonsocial = true;
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
    if (sinpuntos.length < 15) {
      longnumero = 15 - sinpuntos.length;

      let ceros = '0';
      for (let i = 1; i < longnumero; i++) {
        ceros += '0';
      }
      sinpuntos = ceros + sinpuntos;
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
   
    this.formcontacto.get('codigodv').setValue(Number(digitoverificacion));
    this.condicionadoxdefecto = digitoverificacion;
  }

  get codtipocontibuyente() {
    return this.formcontacto.get('codtipocontibuyente');
  }
  get codtipopersona() {
    return this.formcontacto.get('codtipopersona');
  }
  get nombreprimero() {
    return this.formcontacto.get('nombreprimero');
  }
  get nombresegundo() {
    return this.formcontacto.get('nombresegundo');
  }
  get apellidoprimero() {
    return this.formcontacto.get('apellidoprimero');
  }
  get apellidosegundo() {
    return this.formcontacto.get('apellidosegundo');
  }
  get numeroidentificacion() {
    return this.formcontacto.get('numeroidentificacion');
  }
  get direccionfiscal() {
    return this.formcontacto.get('direccionfiscal');
  }
  get telefonofijo1() {
    return this.formcontacto.get('telefonofijo1');
  }
  get telefonofijo2() {
    return this.formcontacto.get('telefonofijo2');
  }
  get telefonofax() {
    return this.formcontacto.get('telefonofax');
  }
  get telefonomovil() {
    return this.formcontacto.get('telefonomovil');
  }
  get correoe() {
    return this.formcontacto.get('correoe');
  }
  get razonsocial() {
    return this.formcontacto.get('razonsocial');
  }
  get limitecreditohasta() {
    return this.formcontacto.get('limitecreditohasta');
  }
  get lugarenvio() {
    return this.formcontacto.get('lugarenvio');
  }
  get direccionexogena() {
    return this.formcontacto.get('direccionexogena');
  }
  get observaciones() {
    return this.formcontacto.get('observaciones');
  }
  get paginaweb() {
    return this.formcontacto.get('paginaweb');
  }
  get codtipoidentificacion() {
    return this.formcontacto.get('codtipoidentificacion');
  }
  get codpais(){
    return this.formcontacto.get('codpais');
  }
  get coddepartamento(){
    return this.formcontacto.get('coddepartamento');
  }
  get codmunicipio(){
    return this.formcontacto.get('codmunicipio');
  }

  onCrearPlazoCredito() {
    this.bsModalRef = this.modalService.show(CrearFormapagoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.listarFormasdepago();
      }


    });
  }

  onChange(event: MatSlideToggleChange) {
    this.formcontacto.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formcontacto.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  onChangeTipo(event) {
    this.ContactoModel.codtipocontacto = this.formcontacto.get('codtipocontacto').value;
  }

  cargarRequeridos(e) {
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formcontacto.controls).forEach(key => {
      if (this.formcontacto.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }
    });
  }

}
