import { CategoriaService } from './../../categoria/CategoriaService.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GrupoArticuloService } from 'src/app/components/grupoarticulo/GrupoArticuloService.service';
import { Articulo } from 'src/app/components/model/Articulo.model';
import { AlmacenService } from '../../almacen/AlmacenService.service';
import { CrearAlmacenModalComponent } from '../../almacen/crear-almacen-modal/crear-almacen-modal.component';
import { CrearCategoriaModalComponent } from '../../categoria/crear-categoria-modal/crear-categoria-modal.component';

import { ArticuloService } from '../ArticuloService.service';
import { formatCurrency, formatDate, getCurrencySymbol } from '@angular/common';
import { ImpuestoService } from 'src/app/components/configuraciones/impuesto/ImpuestoService.service';
import { CrearImpuestosModalComponent } from '../../impuestos/crear-impuestos-modal/crear-impuestos-modal.component';
import { Kardex } from 'src/app/components/model/Kardex.model';
import { UnidadMedidaAlterna } from 'src/app/components/model/UnidadMedidaAlterna.model';
import { UploadService } from '../upload.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { UnidadService } from 'src/app/components/ajustes/unidad/UnidadService.service';
import { MarcaService } from 'src/app/components/ajustes/marca/MarcaService.service';
import { CrearMarcaModalComponent } from 'src/app/components/ajustes/marca/crear-marca-modal/crear-marca-modal.component';
import { CrearUnidadModalComponent } from 'src/app/components/ajustes/unidad/crear-unidad-modal/crear-unidad-modal.component';
import { ConfiguracionesModule } from 'src/app/components/configuraciones/configuraciones.module';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  precioconiva: number = 0;
  preciosiniva: number = 0;
  montoiva: number = 0;
  radioModel = 'Middle';
  uncheckableRadioModel = 'Middle';

  camposrequeridos: string;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  Objetoestado: string = 'Activo';

  id = 0;
  loading = false;
  lstFamilias: any[] = [];
  lstUnidades: any[] = [];
  //lstUnidadesAlternas:any[] = [];
  lstImpuestos: any[] = [];
  lstMarcas: any[] = [];
  lstAlmacenes: any[] = [];
  lstGrupoArticulos: any[] = [];



  lstmovimientoskardex: FormArray;
  lstunidadesalternas: FormArray;


  idnegocio: number;
  formarticulo: FormGroup;

  ArticuloModel: Articulo;
  unidadmedidaxdefecto: 2;
  idivaincluido: number = null;
  bsModalRef: any;
  patterninstrucciones = '^[A-Za-z0-9? _-]+$';
  patten = '[0-9]+(\[0-9][0-9]?)?';
  patternumerodecimal = '[0-9]+(\.[0-9][0-9]?)?';
  parrterobservaciones = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,]*$/;

  patternombreydescripcion = /^[a-zA-Z\u00C0-\u00FF\s\-0-9\.\,\#\%\$\-\_\*\/\&\"\°\¡\!\(\)]*$/;

  customClass = 'customClass';
  isFirstOpen = true;

  visiblecostoxproducto = false;
  visiblecantidad = false;
  visiblecantidadminima = false;
  visiblecantidadmaxima = false;
  visiblepuntoreorden = false;
  visiblebodega = false;
  visiblereferencia = false;
  visibleserial = false;
  visiblecodigobarra = false;
  visiblemarca = false;
  visiblepeso = false;
  visibletalla = false;
  visiblecolor = false;


  codtipoproducto = [
    { id: 1, nombre: 'Producto' },
    { id: 2, nombre: 'Servicio' },
    { id: 3, nombre: 'Materia Prima' },
    { id: 4, nombre: 'Gasto' },
  ];

  tipoivalis = [
    { id: 1, nombre: 'Gravado' },
    { id: 2, nombre: 'Exento' },
    { id: 3, nombre: 'Excluido' },

  ];

  ivaincluidolist = [
    { id: 1, nombre: 'Si' },
    { id: 2, nombre: 'No' },

  ];

  esimpoconsumo = [
    { id: 1, nombre: 'Si' },
    { id: 2, nombre: 'No' },

  ];

  isDisabledState: boolean = true
  esimpoconsumovalor: boolean = true;

  constructor(private articuloservice: ArticuloService,
    private familiaserive: CategoriaService,
    private unidadservice: UnidadService,
    private impuestoservice: ImpuestoService,
    private marcaservice: MarcaService,
    private grupoarticuloservice: GrupoArticuloService,
    private almacenServicio: AlmacenService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private httpClient: HttpClient,
    private uploadService: UploadService) {

    this.ArticuloModel = new Articulo();
    this.idnegocio = 1;
    //this.idivaincluido = 2;
    //this.ArticuloModel.ivaincluido = this.idivaincluido;

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.id) {
      this.id = this.route.snapshot.params.id;
      // this.buscarArticulo(this.id);
    }
    this.buildForm();

  }

  ngOnInit(): void {
    this.listarFamilias();
    this.listarUnidades();
    this.listarImpuestos();
    this.listarMarcas();
    this.listarBodegas();
    this.buscarArticulo(this.id);
    // this.listarGrupoArticulos();
    // this.listarBodegas();
  }

  private buildForm() {
    if (this.ArticuloModel.esimpoconsumo === null) {
      this.esimpoconsumovalor = false;
    }
    else
      if (Number(this.ArticuloModel.esimpoconsumo) === 1) {
        this.esimpoconsumovalor = false;
      }
      else
        if (Number(this.ArticuloModel.esimpoconsumo) === 2) {
          this.esimpoconsumovalor = true;
        }
    //else this.esimpoconsumovalor = false;

    this.formarticulo = this.formbuilder.group({
      codigo: [this.ArticuloModel.codigo, [Validators.required]],
      nomarticulo: [this.ArticuloModel.nomarticulo, [Validators.required, Validators.pattern(this.patternombreydescripcion)]],
      codtipoproducto: [this.ArticuloModel.codtipoproducto, [Validators.required]],
      codfamilia: [this.ArticuloModel.codfamilia, [Validators.required]],
      codunidadmedida: [this.ArticuloModel.codunidadmedida, [Validators.required]],
      codimpuesto: [this.ArticuloModel.codimpuesto, [Validators.required]],
      codmarca: [this.ArticuloModel.codmarca],
      preciosugerido: [this.ArticuloModel.preciosugerido, [Validators.pattern(this.parrterobservaciones)]],
      referencia: [this.ArticuloModel.referencia, [Validators.pattern(this.parrterobservaciones)]],
      serial: [this.ArticuloModel.serial, [Validators.pattern(this.parrterobservaciones)]],
      codigobarraprincipal: [this.ArticuloModel.codigobarraprincipal, [Validators.pattern(this.patternumerodecimal)]],
      descripcionlarga: [this.ArticuloModel.descripcionlarga, [Validators.pattern(this.patternombreydescripcion)]],
      status: [this.ArticuloModel.status === 'Activo' ? 1 : 0],
      stockminimo: [this.ArticuloModel.stockminimo, [Validators.pattern(this.patternumerodecimal)]],
      stockmaximo: [this.ArticuloModel.stockmaximo, [Validators.pattern(this.patternumerodecimal)]],
      cantidadreorden: [this.ArticuloModel.cantidadreorden, [Validators.pattern(this.patternumerodecimal)]],
      peso: [this.ArticuloModel.peso, [Validators.pattern(this.patternumerodecimal)]],
      talla: [this.ArticuloModel.talla, [Validators.pattern(this.patternumerodecimal)]],
      color: [this.ArticuloModel.color, [Validators.pattern(this.parrterobservaciones)]],
      tipoiva: [this.ArticuloModel.tipoiva, [Validators.required, Validators.pattern(this.parrterobservaciones)]],
      ivaincluido: [this.ArticuloModel.ivaincluido, [Validators.required]],
      esimpoconsumo: [this.ArticuloModel.esimpoconsumo === null ? null : Number(this.ArticuloModel.esimpoconsumo), [Validators.pattern(this.parrterobservaciones)]],
      valorimpoconsumo: [{ value: this.ArticuloModel.valorimpoconsumo, disabled: this.esimpoconsumovalor }, [Validators.pattern(this.patternumerodecimal)]],
      porcentajeimpoconsumo: [{ value: this.ArticuloModel.porcentajeimpoconsumo, disabled: this.esimpoconsumovalor }, [Validators.pattern(this.patternumerodecimal)]],
      //lstmovimientoskardex: this.formbuilder.array([this.createItem()]),
      //lstunidadesalternas: this.formbuilder.array([this.createItemUnidadesalternas()])
      lstmovimientoskardex: this.formbuilder.array([]),
      lstunidadesalternas: this.formbuilder.array([])

    })
    this.Objetoestado = this.formarticulo.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  onClickImagen() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  guardarArticulo(event: Event) {
    event.preventDefault();
    const controls = this.formarticulo.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAsTouched();
    });
    if (this.formarticulo.valid) {
      this.loading = true;
      const value = this.formarticulo.value;
      this.articuloservice.guardarArticulo(this.id, value)
        .subscribe(response => {
          this.loading = false;
          this.toastr.info('Los datos se guardaron correctamente', 'Informacion', { enableHtml: true, closeButton: true });
          this.router.navigate(['/main/dashboard/portafolio/listararticulos']);
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

  listarFamilias() {
    this.loading = true;
    this.familiaserive.listarCategorias()
      .subscribe(response => {
        this.lstFamilias = response as any[];  
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

  listarBodegas() {
    this.loading = true;
    this.almacenServicio.listarAlmacenes('')
      .subscribe(response => {
        this.lstAlmacenes = response as any[];
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

  listarUnidades() {
    this.loading = true;
    this.unidadservice.listarUnidades('')
      .subscribe(response => {
        this.lstUnidades = response as any[];
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

  listarImpuestos() {
    this.loading = true;
    this.impuestoservice.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as any[];
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

  listarMarcas() {
    this.loading = true;
    this.marcaservice.listarMarcas('')
      .subscribe(response => {
        this.lstMarcas = response as any[];
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

  listarGrupoArticulos() {
    this.loading = true;
    this.grupoarticuloservice.listarGrupoArticulos('')
      .subscribe(response => {
        this.lstGrupoArticulos = response as any[];
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

  MostrarCamposTipoProducto(event) {
    const idtipo = Number(event);

    if (idtipo === 1) {
      this.visiblecostoxproducto = true;
      this.visiblecantidad = true;
      this.visiblecantidadminima = true;
      this.visiblecantidadmaxima = true;
      this.visiblepuntoreorden = true;
      this.visiblebodega = true;
      this.visiblereferencia = true;
      this.visibleserial = true;
      this.visiblecodigobarra = true;
      this.visiblemarca = true;
      this.visiblepeso = true;
      this.visibletalla = true;
      this.visiblecolor = true;

    }
    else if (idtipo === 2) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }

    else if (idtipo === 3) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }
    else if (idtipo === 4) {

      this.visiblecostoxproducto = false;
      this.visiblecantidad = false;
      this.visiblecantidadminima = false;
      this.visiblecantidadmaxima = false;
      this.visiblebodega = false;
      this.visiblepuntoreorden = false;
      this.visiblereferencia = false;
      this.visibleserial = false;
      this.visiblecodigobarra = false;
      this.visiblemarca = false;
      this.visiblepeso = false;
      this.visibletalla = false;
      this.visiblecolor = false;
    }

  }

  buscarArticulo(id: number) {
    let status = 0;
    this.loading = true;
    this.isDisabledState = false;
    //this.modificable = true;
    const obj = this.articuloservice.mostrarArticulo(id)
      .subscribe(response => {
        this.ArticuloModel = response as any;

        this.buildForm();
        this.ArticuloModel.codtipoproducto = this.formarticulo.get('codtipoproducto').value;
        this.MostrarCamposTipoProducto(this.ArticuloModel.codtipoproducto);
        const formarraylstkardex = this.formarticulo.get("lstmovimientoskardex") as FormArray;
        this.ArticuloModel.lstmovimientoskardex.map(item => {
          formarraylstkardex.push(this.createItem(item));
        });
        this.formarticulo.setControl("lstmovimientoskardex", formarraylstkardex);
        /**  Cargar la lista de unidades alternas**/
        const formarraylstUnidadesAlternas = this.formarticulo.get("lstunidadesalternas") as FormArray;
        this.ArticuloModel.lstunidadesalternas.map(itemalterna => {
          formarraylstUnidadesAlternas.push(this.createItemUnidadesalternas(itemalterna));
        });
        this.formarticulo.setControl("lstunidadesalternas", formarraylstUnidadesAlternas);


        /* if (this.formarticulo.get('esimpoconsumo').value === 2){
        
           this.formarticulo.get('porcentajeimpoconsumo').disable();
           this.formarticulo.controls.valorimpoconsumo.disable();
         }
         if (Number(this.ArticuloModel.esimpoconsumo) === 1){
       
           this.formarticulo.get('porcentajeimpoconsumo').enable();
           this.formarticulo.get('valorimpoconsumo').enable();
         }
         else if (Number(this.ArticuloModel.esimpoconsumo) === 2){
          
           this.formarticulo.get('porcentajeimpoconsumo').disable();
         

           this.formarticulo.get('valorimpoconsumo').disable();
         }
         else{
           this.formarticulo.controls.porcentajeimpoconsumo.enable();
           this.formarticulo.controls.valorimpoconsumo.enable();
         }*/


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
    let i = 0;
    let valido = false;
    this.camposrequeridos = 'Valores Requeridos:\n';
    Object.keys(this.formarticulo.controls).forEach(key => {

      if (this.formarticulo.controls[key].invalid) {
        this.camposrequeridos += key + '\n';
      }

    });

  }

  get codigo() {
    return this.formarticulo.get('codigo');
  }

  get nomarticulo() {
    return this.formarticulo.get('nomarticulo');
  }

  get referencia() {
    return this.formarticulo.get('referencia');
  }

  get serial() {
    return this.formarticulo.get('serial');
  }

  get codigobarraprincipal() {
    return this.formarticulo.get('codigobarraprincipal');
  }

  get descripcionlarga() {
    return this.formarticulo.get('descripcionlarga');
  }

  get preciosugerido() {
    return this.formarticulo.get('preciosugerido');
  }

  get stockminimo() {
    return this.formarticulo.get('stockminimo');
  }

  get stockmaximo() {
    return this.formarticulo.get('stockmaximo');
  }

  get cantidadreorden() {
    return this.formarticulo.get('cantidadreorden');
  }

  get talla() {
    return this.formarticulo.get('talla');
  }

  get peso() {
    return this.formarticulo.get('peso');
  }

  get color() {
    return this.formarticulo.get('color');
  }

  get codfamilia() {
    return this.formarticulo.get('codfamilia');
  }

  get codunidadmedida() {
    return this.formarticulo.get('codunidadmedida');
  }

  get codmarca() {
    return this.formarticulo.get('codmarca');
  }

  get codimpuesto() {
    return this.formarticulo.get('codimpuesto');
  }

  get tipoiva() {
    return this.formarticulo.get('tipoiva');
  }

  get status() {
    return this.formarticulo.get('status');
  }

  get valorimpoconsumo() {
    return this.formarticulo.get('valorimpoconsumo');
  }

  get porcentajeimpoconsumo() {
    return this.formarticulo.get('porcentajeimpoconsumo');
  }

  get ivaincluido() {
    return this.formarticulo.get('ivaincluido');
  }

  onChangeTipo(event) {

    this.ArticuloModel.codtipoproducto = this.formarticulo.get('codtipoproducto').value;
    this.MostrarCamposTipoProducto(this.ArticuloModel.codtipoproducto);
  }

  Esimpoconsumo(event) {

    if (Number(event) === 1) {
      this.formarticulo.controls.porcentajeimpoconsumo.enable();
      this.formarticulo.controls.valorimpoconsumo.enable();
    }
    else if (Number(event) === 2) {
      this.formarticulo.controls.porcentajeimpoconsumo.disable();
      this.formarticulo.get('porcentajeimpoconsumo').setValue("0");
      this.formarticulo.controls.valorimpoconsumo.disable();
      this.formarticulo.get('valorimpoconsumo').setValue("0");
    }
    else {
      this.formarticulo.controls.porcentajeimpoconsumo.enable();
      this.formarticulo.controls.valorimpoconsumo.enable();
    }
  }

  onChangeUnidadPrincipal(event) {
    const formarraylstkardex = this.formarticulo.get("lstmovimientoskardex") as FormArray;
    formarraylstkardex.clear();
    this.ArticuloModel.lstmovimientoskardex = [];
    this.formarticulo.setControl("lstmovimientoskardex", formarraylstkardex);
    const formarraylstUnidadesAlternas = this.formarticulo.get("lstunidadesalternas") as FormArray;
    formarraylstUnidadesAlternas.clear();
    this.ArticuloModel.lstunidadesalternas = [];
    this.formarticulo.setControl("lstunidadesalternas", formarraylstUnidadesAlternas);
  }

  onChange(event: MatSlideToggleChange) {
    this.formarticulo.get('status').setValue(event.checked === true ? '1' : '0');

    this.formarticulo.get('status').setValue(event.checked === true ? 1 : 0);
    this.Objetoestado = this.formarticulo.get('status').value === 1 ? 'Activo' : 'Inactivo';
  }

  onCrearCategoria() {
    this.bsModalRef = this.modalService.show(CrearCategoriaModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {     
      if (result) {
        this.listarFamilias();
      }

    });
  }

  onCrearBodega() {
    this.bsModalRef = this.modalService.show(CrearAlmacenModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.listarBodegas();
      } 

    });
  }

  onCrearImpuesto() {
    this.bsModalRef = this.modalService.show(CrearImpuestosModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {     
      if (result) {
        this.listarImpuestos();
      }

    });
  }

  onCrearUnidad() {
    this.bsModalRef = this.modalService.show(CrearUnidadModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.listarUnidades();
      }

    });
  }

  onCrearMarca() {
    this.bsModalRef = this.modalService.show(CrearMarcaModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {

      if (result) {
        this.listarMarcas();
      }

    });
  }

  removeItemUnidadesAlternas(pos: number) {

    this.ListItemsUnidasesAlternas.removeAt(pos);
  }

  removeItemListaKardex(pos: number) {

    this.ListItems.removeAt(pos);
  }

  addItemUnidadesAlternas(): void {
    const idunidad = Number.parseInt(this.formarticulo.get('codunidadmedida').value);
 
    if (!idunidad) {
      this.toastr.info('Seleccione la Unidad de Medida Principal', 'Informacion', { enableHtml: true, closeButton: true });
    }
    else {
      this.ListItemsUnidasesAlternas.push(this.formbuilder.group({
        codnegocio: [this.idnegocio],
        //codarticulo: [0, [Validators.required]],
        codunidadmedidaalterna: [0, [Validators.required]],
        codunidadminima: [{ value: idunidad, disabled: true }, [Validators.required]],
        valorconversion: [0, [Validators.required]],
        fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
      }));
    }

  }

  get ListItems(): FormArray {
    return this.formarticulo.get("lstmovimientoskardex") as FormArray
  }

  get ListItemsUnidasesAlternas(): FormArray {
    return this.formarticulo.get("lstunidadesalternas") as FormArray
  }

  /*createItem(): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      // documentoid: [0],
      // articulo_id: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      montoxunidad: [1, [Validators.required]],
      montototal: [1, [Validators.required]],
      status: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],

    });
  }*/

  createItem(kardex: Kardex): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      id: [kardex.id],
      articulo_id: [kardex.articulo_id],
      codunidadmedida: [kardex.codunidadmedida, [Validators.required]],
      codalmacen: [kardex.codalmacen, [Validators.required]],
      cantidad: [kardex.cantidad, [Validators.required]],
      montoxunidad: [kardex.montoxunidad, [Validators.required]],
      montototal: [kardex.montototal, [Validators.required]],
      status: [kardex.status, [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],

    });
  }

  addItem(): void {
    this.ListItems.push(this.formbuilder.group({
      codnegocio: [this.idnegocio],
      //articulo_id: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      montoxunidad: [1, [Validators.required]],
      montototal: [1, [Validators.required]],
      status: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]]
    }));
  }

  createItemUnidadesalternas(unidadmedidaalterna: UnidadMedidaAlterna): FormGroup {
    return this.formbuilder.group({
      codnegocio: [this.idnegocio],
      id: [unidadmedidaalterna.id],
      articulo_id: [unidadmedidaalterna.articulo_id],
      codunidadmedidaalterna: [unidadmedidaalterna.codunidadmedidaalterna, [Validators.required]],
      codunidadminima: [unidadmedidaalterna.codunidadminima, [Validators.required]],
      valorconversion: [unidadmedidaalterna.valorconversion, [Validators.required]]
    });
  }

  CalcularPrecioVenta(event) {
    var valorimpuesto: number = 0;
    var montoimpuesto: number = 0;
    var precio: number = 0;
    var precioiva: number = 0;
    var porcentajeiva: number = 0;
    var tieneivaincluido: number;
    var preciosinivas: number = 0;
    valorimpuesto = this.lstImpuestos[event - 1].normal;
    tieneivaincluido = Number(this.formarticulo.get('ivaincluido').value);
    precio = Number(this.formarticulo.get('preciosugerido').value);
    if (tieneivaincluido === 2) {
      montoimpuesto = (precio * valorimpuesto) / 100;
      this.preciosiniva = precio;
      this.montoiva = montoimpuesto;
      precioiva = precio + montoimpuesto;
      this.precioconiva = precioiva;
    }
    else if (tieneivaincluido === 1) {
      this.precioconiva = precio;
      porcentajeiva = (valorimpuesto / 100) + 1;
      preciosinivas = precio / porcentajeiva;
      this.preciosiniva = preciosinivas;
      montoimpuesto = (preciosinivas * valorimpuesto) / 100;
      this.montoiva = montoimpuesto;
    }
    //this.formarticulo.get('precioconiva').setValue(Number(digitoverificacion));}
  }

  updateValue(value: string) {
    let val = parseInt(value, 10);
    if (Number.isNaN(val)) {
      val = 0;
    }
    //this.formarticulo.get('preciosugerido').setValue(formatCurrency(val, 'es_CO', getCurrencySymbol('COP', 'wide')));
  }

}
