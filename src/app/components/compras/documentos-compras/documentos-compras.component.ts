import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CrearFormapagoModalComponent } from '../../ajustes/formapago/crear-formapago-modal/crear-formapago-modal.component';
import { FormaPagoService } from '../../ajustes/formapago/FormaPagoService.service';
import { UnidadService } from '../../ajustes/unidad/UnidadService.service';
import { ImpuestoService } from '../../configuraciones/impuesto/ImpuestoService.service';
import { NumeracionDocumentoService } from '../../configuraciones/numeraciondocumento/NumeracionDocumentoService.service';
import { TipoDocumentoService } from '../../configuraciones/tipodocumento/TipoDocumentoService.service';
import { Articulo } from '../../model/Articulo.model';
import { Contacto } from '../../model/Contacto.model';
import { DocumentoCompra } from '../../model/DocumentoCompra.model';
import { NumeracionDocumento } from '../../model/NumeracionDocumento.model';
import { AlmacenService } from '../../portafolio/almacen/AlmacenService.service';
import { ArticuloService } from '../../portafolio/articulo/ArticuloService.service';
import { CatalogoArticuloModalComponent } from '../../portafolio/articulo/catalogo-articulo-modal/catalogo-articulo-modal.component';
import { ContactoService } from '../../portafolio/contacto/ContactoService.service';
import { ModalClienteComponent } from '../../portafolio/contacto/modal-cliente/modal-cliente.component';
import { VendedorService } from '../../portafolio/vendedor/VendedorService.service';
import { DocumentoCompraService } from '../DocumentoCompraService.service';

@Component({
  selector: 'app-documentos-compras',
  templateUrl: './documentos-compras.component.html',
  styleUrls: ['./documentos-compras.component.css']
})
export class DocumentosComprasComponent implements OnInit {

  loading = false;
  bsModalRef: BsModalRef;

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  customClass = 'customClass';
  isFirstOpen = true;

  lstformaspago: any [] = [];
  lstVendedores: any [] = [];
  lstUnidades: any[] = [];
  lstImpuestos: any[] = [];
  lstAlmacenes: any[] = [];
  lstNumeracionDocumento: any[] = [];



  DocumentoCompraForm: FormGroup;
  lstdetallesdocumentocompras: FormArray;

  tipodocumento: string = '';
  titulo: string = '';
  url: string = '';

  id = 0;
  idnegocio: number;
  nombreprimero: string;
  numeroidentificacion:string;
  direccionfiscal:string;
  precsiniva: number;
  cant: number;
  tipopersona:string;
  telefono:string;
  ContactoModel: Contacto;
  ArticuloModel:Articulo;
  DocumentoCompraModel:DocumentoCompra;
  numeracionDocumentoModel: NumeracionDocumento;
  prefijofactura: string;
  numerodocumentos: number;
  numerodocumentoconcatenado: string;
  nombrearticulo: string[] = [];
  montototalsiniva:number;
  montototaliva:number;
  montototalconiva:number;

  constructor(private contactoServicio: ContactoService,
    private articuloServicio: ArticuloService,
    private documentocompraServicio: DocumentoCompraService,
    private modalService: BsModalService,
    private numeraciondocumentoServicio: NumeracionDocumentoService,
    private formaPagoService: FormaPagoService,
    private vendedorService: VendedorService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private Unidadservice: UnidadService,
    private Impuestoservice: ImpuestoService,
    private Almacenservice: AlmacenService,
    private Articuloservicio: ArticuloService,
    private tipodocumentoServicio: TipoDocumentoService,
    private VendedorService: VendedorService) {

    this.DocumentoCompraModel = new DocumentoCompra();
    this.idnegocio = 1;
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.tipodocumento){
      this.tipodocumento = this.route.snapshot.params.tipodocumento;

    }
    if (this.route.snapshot.params.id){
      this.id = this.route.snapshot.params.id;
    }
    }

  ngOnInit(): void {

    this.onTipoDocumento(this.tipodocumento);
    this.listarNumeracionDocumento(this.tipodocumento);
    this.buildForm();

    this.listarVendedores();
    this.listarFormasdepago();
    this.onListarImpuestos();
    this.onListarUnidades();
    this.onListarAlmacen();
  }

  private buildForm(){

    this.DocumentoCompraModel.tipodocumento = this.tipodocumento;
    this.DocumentoCompraModel.codnegocio = this.idnegocio;
    this.DocumentoCompraForm = this.formBuilder.group({
      numerodocumento:[this.DocumentoCompraModel.numerodocumento, [Validators.required]],
      codformapago: [this.DocumentoCompraModel.codformapago, [Validators.required]],
      codcontacto: [this.DocumentoCompraModel.codcontacto, [Validators.required]],
      codvendedor:[this.DocumentoCompraModel.codvendedor, [Validators.required]],
      fechaemision:[formatDate(this.DocumentoCompraModel.fechaemision, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fechavencimiento:[formatDate(this.DocumentoCompraModel.fechavencimiento, 'dd-MM-yyyy', 'en'), [Validators.required]],
      fecha:[formatDate(this.DocumentoCompraModel.fecha, 'dd-MM-yyyy', 'en'), [Validators.required]],
      referencia:[this.DocumentoCompraModel.referencia],
      status: [this.DocumentoCompraModel.status === 'ACTIVO' ? 1 : 0],
      baseimp:[this.DocumentoCompraModel.baseimp],
      isrl: [this.DocumentoCompraModel.isrl],
      observacion: [this.DocumentoCompraModel.observacion],
      numcontrol: [this.DocumentoCompraModel.numcontrol],
      numretencion: [this.DocumentoCompraModel.numretencion],
      pctiva_a: [this.DocumentoCompraModel.pctiva_a],
      pctiva_b: [this.DocumentoCompraModel.pctiva_b],
      descuento:[this.DocumentoCompraModel.descuento],
      subtotal: [this.DocumentoCompraModel.subtotal],
      total: [this.DocumentoCompraModel.total],
      montoretenido: [this.DocumentoCompraModel.montoretenido],
      status_cobro: [this.DocumentoCompraModel.status_cobro],
      tipodocumento: [this.DocumentoCompraModel.tipodocumento],
      contable: [this.DocumentoCompraModel.contable],
      numeroz: [this.DocumentoCompraModel.numeroz],
      status_impresion: [this.DocumentoCompraModel.status_impresion],
      codruta: [this.DocumentoCompraModel.codruta],
      lstdetallesdocumentocompras: this.formBuilder.array([this.createItem()])
      //itemDetails: this.formBuilder.array([this.formBuilder.group({codigo: '', descripcion: '', price: ''})])

    });
    (this.DocumentoCompraForm.get('lstdetallesdocumentocompras') as FormArray).valueChanges.subscribe(lisatadoarticulos => {

        this.montototalsiniva=0;
        lisatadoarticulos.forEach(element => {

          this.montototalsiniva=this.montototalsiniva + element.baseimponible ;
         // this.montototalconiva=montototalsiniva *

         /* montoimpuesto = (precio * valorimpuesto) / 100;
  
      this.preciosiniva = precio;
      this.montoiva = montoimpuesto;
      precioiva = precio + montoimpuesto;
      this.precioconiva = precioiva;*/

        });
      
    });

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      codnegocio: [this.idnegocio],
      documentoid: [0],
      codarticulo: [0, [Validators.required]],
      codimpuesto: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      preciounitariosiniva: [0, [Validators.required]],
      montototalconiva: [0, [Validators.required]],
      baseimponible: [0, [Validators.required]],
      porcentajedescuento: [0, [Validators.required]],
      montodescuento: [0, [Validators.required]],
      porcentajeimpuesto: [0, [Validators.required]],
      montoimpuesto: [0, [Validators.required]],
      islr: [0, [Validators.required]],
      porcentajeislr: [0, [Validators.required]],
      status: ['A', [Validators.required]],
      tipoarticulo: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
      serial: [''],
      garantia: [''],
      tipodocumento: [this.tipodocumento]
    });
  }


  addItem(): void {

    this.ListItems.push(this.formBuilder.group({
      codnegocio: [this.idnegocio],
      codarticulo: [0, [Validators.required]],
      codimpuesto: [0, [Validators.required]],
      codunidadmedida: [0, [Validators.required]],
      codalmacen: [0, [Validators.required]],
      cantidad: [1, [Validators.required]],
      preciounitariosiniva: [0, [Validators.required]],
      montototalconiva: [0, [Validators.required]],
      baseimponible: [0, [Validators.required]],
      porcentajedescuento: [0, [Validators.required]],
      montodescuento: [0, [Validators.required]],
      porcentajeimpuesto: [0, [Validators.required]],
      montoimpuesto: [0, [Validators.required]],
      islr: [0, [Validators.required]],
      porcentajeislr: [0, [Validators.required]],
      status: ['A', [Validators.required]],
      tipoarticulo: ['A', [Validators.required]],
      fecha: [formatDate(new Date(), 'dd-MM-yyyy', 'en'), [Validators.required]],
      serial: [''],
      garantia: [''],
      tipodocumento: [this.tipodocumento]
    }));
  }




  get ListItems() : FormArray {
    return this.DocumentoCompraForm.get("lstdetallesdocumentocompras") as FormArray
  }

  onFormSubmit(event: Event){
    event.preventDefault();
    let data = JSON.stringify(this.DocumentoCompraForm.value);
    event.preventDefault();
    this.loading = true;
    const value = this.DocumentoCompraForm.value;
    this. documentocompraServicio.guardarDocumentoCompra(this.id, this.idnegocio, value)
    .subscribe(response => {
      this.loading = false;
      this.toastr.info('El Documento se guardo correctamente', 'Informacion', { enableHtml: true, closeButton: true });
      this.onRedireccionar(this.tipodocumento);
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


  buscarContacto(id: number) {
    const obj = this.contactoServicio.mostrarContactos(id)
      .subscribe(response => {
        this.ContactoModel = response as any;

        if (this.nombreprimero === '') {
          this.nombreprimero = this.ContactoModel.razonsocial;
        }
        else {
          this.nombreprimero = this.ContactoModel.nombreprimero + ' ' +
            this.ContactoModel.nombresegundo + ' ' +
            this.ContactoModel.apellidoprimero + ' ' +
            this.ContactoModel.apellidosegundo;
        }
        this.DocumentoCompraForm.controls['codcontacto'].setValue(this.ContactoModel.id);
        this.numeroidentificacion = this.ContactoModel.numeroidentificacion;
        this.telefono = this.ContactoModel.telefonofijo1;
        this.direccionfiscal = this.ContactoModel.direccionfiscal;
        if (this.ContactoModel.codtipopersona === 1)
          if (this.ContactoModel.codtipopersona === 1) {
            this.tipopersona = 'Persona Natural';
          }
          else {
            this.tipopersona = 'Persona Juridica';
          }
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



  onListarClientes() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(ModalClienteComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
        this.buscarContacto(result);
    });

  }



  onListarArticulos(pos: number) {

    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(CatalogoArticuloModalComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {     
      this.buscarArticulo(result, pos);
    });
  }
  buscarArticulo(id: number, pos: number) {
    let status = 0;
    const obj = this.Articuloservicio.mostrarArticulo(id)
      .subscribe(response => {
        this.ArticuloModel = response as any;
        if (this.ArticuloModel.status === 'ACTIVO') {
          status = 1;
        }
        else {
          status = 0;
        }
        this.ListItems.controls[pos].get('codarticulo').setValue(this.ArticuloModel.id);
        this.nombrearticulo[pos] = this.ArticuloModel.nomarticulo;
        this.ListItems.controls[pos].get('preciounitariosiniva').setValue(this.ArticuloModel.preciosugerido);
        this.ListItems.controls[pos].get('codunidadmedida').setValue(this.ArticuloModel.codunidadmedida);
        this.ListItems.controls[pos].get('codimpuesto').setValue(this.ArticuloModel.codimpuesto);

        const cant = Number(this.ListItems.controls[pos].get('cantidad').value);
        const precionu = Number(this.ListItems.controls[pos].get('preciounitariosiniva').value);
        this.precsiniva = cant * precionu;
        this.ListItems.controls[pos].get('baseimponible').setValue(this.precsiniva);
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
  onCrearPlazoCredito() {
    this.bsModalRef = this.modalService.show(CrearFormapagoModalComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.listarFormasdepago();
      }

    });
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

  listarVendedores() {
    this.loading = true;
    this.VendedorService.listarVendedores('')
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


  onTipoDocumento(tipo){
    if (tipo === 'facturacompra'){
      this.titulo = 'Factura de Compra';
      this.url = '/compras/catalogodocumentodecompra-factura/facturacompra';
    }
    else if (tipo === 'cotizacion'){
      this.titulo = 'Cotizaciones';
      this.url = '/ventas/catalogodocumentodeventa-cotizacion/cotizacion';
    }
  }

  onRedireccionar(tipo){
    if (tipo === 'facturacompra'){
      this.router.navigate(['/main/dashboard/compras/catalogodocumentodecompra-factura/facturacompra']);

    }
    else if (tipo === 'cotizacion'){
      this.router.navigate(['ventas/catalogodocumentodeventa-cotizacion/cotizacion']);

    }
  }
  onListarUnidades() {
    this.loading = true;
    this.Unidadservice.listarUnidades('')
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

  onListarImpuestos() {
    this.loading = true;
    this.Impuestoservice.listarImpuestos('')
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

  onListarAlmacen() {
    this.loading = true;
    this.Almacenservice.listarAlmacenes('')
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
  CalcularPrecioVenta(pos: number) {

    //this.precsiniva = this.ArticuloModel.preciosugerido * event;
    //this.cant = event;
    const cant = Number(this.ListItems.controls[pos].get('cantidad').value);
    const precionu = Number(this.ListItems.controls[pos].get('preciounitariosiniva').value);
    this.precsiniva = cant * precionu;
    this.ListItems.controls[pos].get('baseimponible').setValue(this.precsiniva);
    // this.ListItems.controls[pos].get('baseimponible').setValue(this.precsiniva);

  }
  private listarNumeracionDocumento(tipo: string): void {
    this.loading = true;
    this.lstNumeracionDocumento = [];
    this.numeraciondocumentoServicio.obtenerNumeracionDocumentoPorTipoDocumento('', this.tipodocumento)
      .subscribe(response => {
        this.lstNumeracionDocumento = response as NumeracionDocumento[];
        this.lstNumeracionDocumento.forEach(element => {

          if (element.tipodedocumento === 'facturacompra') {
            if (element.principal) {
              this.prefijofactura = element.prefijo;
              this.numerodocumentos = element.proximonumerodocumento;
              this.numerodocumentoconcatenado = element.prefijo + element.proximonumerodocumento,
              this.DocumentoCompraForm.controls['numerodocumento'].setValue(this.numerodocumentoconcatenado);
            }
          }

          //this.numerodocumento=this.numerodocumentos;
        });
        /*this.dataSource = new MatTableDataSource(this.lstNumeracionDocumento);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstDocumentos.length;
        this.sortedData = this.lstDocumentos.slice();
        this.loading = false;*/
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

  onModificarNumeracionDocumento() {
    //this.router.navigate(['inventario/creararticulo', id]);
    //this.router.navigate(['main/dashboard/configuraciones/crearnumeraciondocumento', id]);

    //this.bsModalRef = this.modalService.show(CrearNumeraciondocumentoModalComponent);
    //this.bsModalRef.content.onClose.subscribe(result => {
    //  if (result) {
    // this.listarFormasdepago();
    //}

    //});
  }
}
export class Item {
  coditem = '';
  NomItem = '';
  Precio = 0;
}
