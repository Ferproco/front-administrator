import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from '../../model/Articulo.model';
import { ArticuloKardex } from '../../model/ArticuloKardex.model';
import { Kardex } from '../../model/Kardex.model';
import { AlmacenService } from '../../portafolio/almacen/AlmacenService.service';
import { ArticuloService } from '../../portafolio/articulo/ArticuloService.service';
import { CatalogoArticuloModalComponent } from '../../portafolio/articulo/catalogo-articulo-modal/catalogo-articulo-modal.component';
import { KardexService } from '../KardexService.service';

@Component({
  selector: 'app-catalogo-valorkardex',
  templateUrl: './catalogo-valorkardex.component.html',
  styleUrls: ['./catalogo-valorkardex.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class CatalogoValorkardexComponent implements OnInit {
  entoVenta;
  ArticuloModel: Articulo;
  bsModalRef: BsModalRef;
  loading = false;
  titulo = 'Listado de Articulos';
  lstKardex: Kardex[] = [];
  lstArticulos: ArticuloKardex[] = [];
  lstAlmacenes: any[] = [];
  tipoproductoconfig = 'T';
  sortedData;
  filtrararticulos = '';
  //tipoproductoconfig = 'T';
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

  fechainicial: string = formatDate(new Date(), 'dd-MM-yyyy', 'en');
  fechafinal:   string = formatDate(new Date(), 'dd-MM-yyyy', 'en');

  //displayedColumns: string[] = ['Fecha','Codigo', 'Items','Tercero','Tipo Doc','Documento Asociado' ,'Concepto', 'Cantidad' , 'Und Medida'  ,'Costo Promedio','Total','Status'];

  //displayedColumns: string[] =['Codigo', 'Nombre'/*,  'Categoria' ,'Precio', 'Und Medida'  ,'Impuesto','Status', 'Acción'*/];
 // dataSource: MatTableDataSource<Kardex>;
  //dataSource: MatTableDataSource<Articulo>;
  selection = new SelectionModel<ArticuloKardex>(true, []);

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private articuloServicio: ArticuloService,
              private almacenServicio: AlmacenService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: BsModalService,
              private Articuloservicio: ArticuloService) {

              this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
              this.idnegocio = 1;
    }

   // @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['codigo', 'nombre', 'entrada', 'salida', 'saldo', 'costo', 'costototal'];
    dataSource = null;

    rowClick(row: any) {
      this.expandedElement = this.expandedElement === row ? null : row;
    }

  ngOnInit(): void {
    this.formatransacciones = this.formBuilder.group({
      fechadesde:  new FormControl(formatDate(new Date(), 'dd-MM-yyyy', 'en')),//[formatDate(new Date(), 'dd-MM-yyyy', 'en')],
      fechahasta:  new FormControl(formatDate(new Date(), 'dd-MM-yyyy', 'en')),//[formatDate(new Date(), 'dd-MM-yyyy', 'en')],
      codalmacen: 0,
      codarticulo: '',
      idarticulo: 0
    });

    this.listarArticulosPorTipo(this.tipoproductoconfig);
    this.listarBodegas();
  }

  ngAfterViewInit() {

  }

  searchfilter(event: Event) {
    event.preventDefault();
    this.listarArticulosPorTipo(this.tipoproductoconfig);
  }

  onValueChangeFI(value: string): void {
    this.fechainicial = formatDate(value, 'dd-MM-yyyy', 'en');//[formatDate(new Date(), 'dd-MM-yyyy', 'en');
  }
  onValueChangeFF(value: string): void {
    this.fechafinal = formatDate(value, 'dd-MM-yyyy', 'en');
  }

  private listarArticulosPorTipo(tipo: string): void {

    const value = this.formatransacciones.value;
    this.loading = true;
    this.lstArticulos = [];
    let status = 0;
    this.dataSource = new ExampleDataSource(this.lstArticulos);
    this.articuloServicio.listarArticulosPorFilter(tipo, this.fechainicial, this.fechafinal, value)
      .subscribe(response => {
        this.lstArticulos = response as ArticuloKardex[];
        this.dataSource = new ExampleDataSource(this.lstArticulos);
        this.dataSource.sort = this.sort;
        //this.dataSource = new MatTableDataSource(this.lstArticulos);
        //this.dataSource.paginator = this.paginator;
        //this.LengthTable = this.lstArticulos.length;
        //this.sortedData = this.lstArticulos.slice();
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

  onListarArticulos() {
    const config: ModalOptions = { class: 'modal-lg' };
    this.bsModalRef = this.modalService.show(CatalogoArticuloModalComponent, config);
    this.bsModalRef.content.onSelect.subscribe(result => {
      this.buscarArticulo(result);
    });
  }

  buscarArticulo(id: number) {
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
        this.formatransacciones.get('codarticulo').setValue(this.ArticuloModel.codigo);
        this.formatransacciones.get('idarticulo').setValue(this.ArticuloModel.id);

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstKardex.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  Ver(id: number){
    if (0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
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

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.LengthTable;//this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ArticuloKardex): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}


export class ExampleDataSource extends MatTableDataSource<any> {

  addExpandedRows(initData) {
    const rows = [];
    initData.forEach(element => rows.push(element, {detailRow: true, element}));
    return rows;
  }

  constructor(initialData: any[]) {
    super(initialData);
    this.data = this.addExpandedRows(initialData);
  }

  sortData = (dataForSort, sort: MatSort) => {

    const active = sort.active;
    const direction = sort.direction;

    if (!active || direction === '') {
      return dataForSort;
    }

    const filtered = dataForSort.filter(item => {
      return !item.hasOwnProperty('detailRow');
    }).sort((a, b) => {
      const valueA = this.sortingDataAccessor(a, active);
      const valueB = this.sortingDataAccessor(b, active);

      // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
      // one value exists while the other doesn't. In this case, existing value should come first.
      // This avoids inconsistent results when comparing values to undefined/null.
      // If neither value exists, return 0 (equal).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (direction === 'asc' ? 1 : -1);
    });

    return this.addExpandedRows(filtered);
  }

}
