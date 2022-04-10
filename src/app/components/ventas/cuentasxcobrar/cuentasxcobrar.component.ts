import { animate, state, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from '../../model/Contacto.model';
import { CuentasxCobrar } from '../../model/CuentasxCobrar.model';
import { ContactoService } from '../../portafolio/contacto/ContactoService.service';
import { ModalClienteComponent } from '../../portafolio/contacto/modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-cuentasxcobrar',
  templateUrl: './cuentasxcobrar.component.html',
  styleUrls: ['./cuentasxcobrar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CuentasxcobrarComponent implements OnInit {

  bsModalRef: BsModalRef;
  loading = false;
  sortedData;
  lstcuentasporcobrar: CuentasxCobrar[] = [];
  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  LengthTable = 0;
  idnegocio: number;
  showModalBox: boolean = false;
  PuedeEliminar: boolean = false;
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();
  bsValue = new Date();
  formatransacciones: FormGroup;
  ContactoModel: Contacto;

  fechainicial: string = formatDate(new Date(), 'dd-MM-yyyy', 'en');
  fechafinal:   string = formatDate(new Date(), 'dd-MM-yyyy', 'en');

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: BsModalService,
              private contactoService: ContactoService) {

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    this.idnegocio = 1;
    this.ContactoModel = new Contacto();
  }

  displayedColumns = ['ndocumentocxc', 'contacto', 'ndocumentoventa', 'tipodocumento', 'fechaemision', 'fechavence','dias', 'monto'];
  dataSource = null;

  rowClick(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  ngOnInit(): void {

    this.formatransacciones = this.formBuilder.group({
      fechadesde:  new FormControl(formatDate(new Date(), 'dd-MM-yyyy', 'en')),//[formatDate(new Date(), 'dd-MM-yyyy', 'en')],
      fechahasta:  new FormControl(formatDate(new Date(), 'dd-MM-yyyy', 'en')),//[formatDate(new Date(), 'dd-MM-yyyy', 'en')],
      numeroidentificacion: '',
      idcliente: 0
    });
  }

  sortData(sort: Sort) {
    const data = this.lstcuentasporcobrar.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  onListarClientes() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(ModalClienteComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      this.buscarCliente(result);
    });
  }

  buscarCliente(id: number) {

    const obj = this.contactoService.mostrarContactos(id).subscribe(response => {
        this.ContactoModel = response as any;

        this.formatransacciones.get('numeroidentificacion').setValue(this.ContactoModel.numeroidentificacion);
        this.formatransacciones.get('idcliente').setValue(this.ContactoModel.id);
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

  onValueChangeFI(value: string): void {
    this.fechainicial = formatDate(value, 'dd-MM-yyyy', 'en');//[formatDate(new Date(), 'dd-MM-yyyy', 'en');
  }
  onValueChangeFF(value: string): void {
    this.fechafinal = formatDate(value, 'dd-MM-yyyy', 'en');
  }

  ExportarExcel(){

  }

  ExportarTxt(){

  }

  Refrescar() {
    //this.tipoproductoconfig = 'T';
   // this.listarArticulosPorTipo(this.tipoproductoconfig);
  }
  Importar(){

  }

  searchfilter(event: Event) {
    event.preventDefault();
    //this.listarArticulosPorTipo(this.tipoproductoconfig);
  }

}
