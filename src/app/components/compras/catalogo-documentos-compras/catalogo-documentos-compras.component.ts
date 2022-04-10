import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MensajeEliminarComponent } from '../../mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { DocumentoCompra } from '../../model/DocumentoCompra.model';
import { DocumentoCompraService } from '../DocumentoCompraService.service';

@Component({
  selector: 'app-catalogo-documentos-compras',
  templateUrl: './catalogo-documentos-compras.component.html',
  styleUrls: ['./catalogo-documentos-compras.component.css']
})
export class CatalogoDocumentosComprasComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Contactos';
  lstDocumentos: DocumentoCompra[] = [];
  sortedData;
  LengthTable = 0;

  tipodocumentoconfig: string;

  bsModalRef: BsModalRef;

  tipodocumento: string = '';
  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  currentDate = new Date();

  displayedColumns: string[] = ['select', 'N° DOCUMENTO', 'CONTACTO', 'FECHA EMISION', 'FECHA VENCE', 'VENDEDOR', 'FORMA PAGO', 'ESTATUS', 'ACCION'];
  dataSource: MatTableDataSource<DocumentoCompra>;
  selection = new SelectionModel<DocumentoCompra>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentoServicio: DocumentoCompraService,
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
    
    if (this.tipodocumento === 'facturacompra'){
      this.titulo = 'Factur Compra';
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
        this.lstDocumentos = response as DocumentoCompra[];
        this.lstDocumentos.forEach(element => {
          /*if (element.nombreprimero === '') {
            element.nombreprimero = element.razonsocial;
          }
          else {
            element.nombreprimero = element.nombreprimero   + ' ' +
                                    element.nombresegundo   + ' ' +
                                    element.apellidoprimero + ' ' +
                                    element.apellidosegundo;
          }*/
          //this.lstContactos.push(element);
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
    if (this.tipodocumento === 'facturacompra'){
      this.router.navigate(['/main/dashboard/compras/documentodecompra-factura',this.tipodocumento]);
    }
    else if (this.tipodocumento === 'cotizacion'){
      this.router.navigate(['ventas/documentodeventa-cotizacion',this.tipodocumento]);
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
   checkboxLabel(row?: DocumentoCompra): string {
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
      console.log('results', result);
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
