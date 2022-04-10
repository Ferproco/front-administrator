import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ArticuloKardex } from '../../model/ArticuloKardex.model';
import { Kardex } from '../../model/Kardex.model';
import { KardexService } from '../KardexService.service';

@Component({
  selector: 'app-table-transaccion-inventarios',
  templateUrl: './table-transaccion-inventarios.component.html',
  styleUrls: ['./table-transaccion-inventarios.component.css']
})
export class TableTransaccionInventariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'Fecha',
    //'Codigo',
    //'Items',
    'Tercero',
    'Tipo Documento',
    'Documento Asociado',
    'Concepto',
    'Almacen',
    'Entrada',
    'Salida',
    'Und Medida',
    'Costo Promedio',
    'Total'];
  dataSource: MatTableDataSource<Kardex>;
  selection = new SelectionModel<Kardex>(true, []);
  loading = false;
  lstKardex: Kardex[] = [];
  LengthTable = 0;
  sortedData;
  @Input() masterRow: ArticuloKardex;

  constructor(private kardexServicio: KardexService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarkardex();
  }

  listarkardex() {
    this.loading = true;
    this.lstKardex = [];
    let status = 0;
    let articulokardex = this.masterRow as ArticuloKardex;

    articulokardex.lstmovimientoskardex.forEach(element => {
      if (element.cantidad >= 0) {
        element.entrada = element.cantidad;
        element.salida = 0;
      }
      else {
        element.salida = Number(element.cantidad) * -1;
        element.entrada = 0;
      }
      if (element.contacto != null) {
        if (element.contacto.nombreprimero === '') {
          element.contacto.nombreprimero = element.contacto.razonsocial;
        }
        else {
          element.contacto.nombreprimero = element.contacto.nombreprimero + ' ' +
            element.contacto.nombresegundo + ' ' +
            element.contacto.apellidoprimero + ' ' +
            element.contacto.apellidosegundo;
        }
      }
    });

    this.lstKardex = articulokardex.lstmovimientoskardex;
    this.dataSource = new MatTableDataSource(this.lstKardex);
    this.dataSource.paginator = this.paginator;
    this.LengthTable = this.lstKardex.length;
    this.sortedData = this.lstKardex.slice();
    this.loading = false;
    /*this.kardexServicio.listarKardex('')
      .subscribe(response => {
        this.lstKardex = response as Kardex[];
        this.dataSource = new MatTableDataSource(this.lstKardex);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstKardex.length;
        this.sortedData = this.lstKardex.slice();
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
        }));*/
  }

  sortData(sort: Sort) {
    const data = this.lstKardex.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Kardex): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.LengthTable;//this.dataSource.data.length;
    return numSelected === numRows;
  }

}
