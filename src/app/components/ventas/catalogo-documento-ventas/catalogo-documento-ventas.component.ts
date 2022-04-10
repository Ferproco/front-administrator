import { DocumentoVenta } from './../../model/DocumentoVenta.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentosVentasService } from '../documentos-ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MensajeEliminarComponent } from '../../mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-catalogo-documento-ventas',
  templateUrl: './catalogo-documento-ventas.component.html',
  styleUrls: ['./catalogo-documento-ventas.component.css']
})
export class CatalogoDocumentoVentasComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Contactos';
  lstDocumentos: DocumentoVenta[] = [];
  sortedData;
  LengthTable = 0;

  tipodocumentoconfig: string;

  bsModalRef: BsModalRef;

  tipodocumento: string = '';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  displayedColumns: string[] = ['select', 'N° DOCUMENTO', 'CONTACTO', 'FECHA EMISION', 'FECHA VENCE', 'VENDEDOR', 'FORMA PAGO', 'ESTATUS', 'ACCION'];
  dataSource: MatTableDataSource<DocumentoVenta>;
  selection = new SelectionModel<DocumentoVenta>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentoServicio: DocumentosVentasService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private route: ActivatedRoute) {

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
    if (this.route.snapshot.params.tipodocumento) {
      this.tipodocumento = this.route.snapshot.params.tipodocumento;

    }
              }

  ngOnInit(): void {

    this.onTipoDocumento();
    this.listarDocumento(this.tipodocumento);
  }

  onTipoDocumento(){
    if (this.tipodocumento === 'factura'){
      this.titulo = 'Factura Venta';
    }
    else if (this.tipodocumento === 'cotizacion'){
      this.titulo = 'Cotizaciones';
    }
  }

  private listarDocumento(tipo: string): void {
    this.loading = true;
    this.lstDocumentos = [];
    this.documentoServicio.listarDocumentosPorTipo('', tipo)
      .subscribe(response => {
        this.lstDocumentos = response as DocumentoVenta[];
        this.lstDocumentos.forEach(element => {

        });
        this.dataSource = new MatTableDataSource(this.lstDocumentos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstDocumentos.length;
        this.sortedData = this.lstDocumentos.slice();
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

  registrardocumento() {
    if (this.tipodocumento === 'factura'){
      //main/dashboard/portafolio/crearalmacen
      this.router.navigate(['/main/dashboard/ventas/documentodeventa-factura',this.tipodocumento]);
    }
    else if (this.tipodocumento === 'cotizacion'){
      this.router.navigate(['/main/dashboard/ventas/documentodeventa-cotizacion',this.tipodocumento]);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.LengthTable;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: DocumentoVenta): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.documentoid + 1}`;
  }

  sortData(sort: Sort) {
    const data = this.lstDocumentos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  ExportarExcel() {

  }

  ExportarTxt() {

  }

  Refrescar() {
    this.tipodocumentoconfig = 'T';
    this.listarDocumento(this.tipodocumentoconfig);
  }

  Importar() {

  }

  Ver() {

  }

  Modificar(id: number){

    this.router.navigate(['contactos/crearcontacto', id]);
  }

  Eliminar(id: number) {

    this.bsModalRef = this.modalService.show(MensajeEliminarComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
    
      if (result){
        this.eliminarporcodigo(id);
      }
    });

  }

  eliminarporcodigo(id: number){
    /*this.loading = true;
    this.contactoServicio.eliminarContacto(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarContactos(this.tipopersonaconfig);
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));*/
  }

}
