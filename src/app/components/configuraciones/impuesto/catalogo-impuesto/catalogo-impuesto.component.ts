import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImpuestoService } from '../ImpuestoService.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Impuesto } from 'src/app/components/model/Impuesto.model';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';


@Component({
  selector: 'app-catalogo-impuesto',
  templateUrl: './catalogo-impuesto.component.html',
  styleUrls: ['./catalogo-impuesto.component.css']
})
export class CatalogoImpuestoComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Impuestos';
  lstImpuestos: Impuesto[] = [];
  LengthTable = 0;
  sortedData;

  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'Codigo', 'Nombre', 'Tarifa', 'Tipo Impuesto' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<Impuesto>;
  selection = new SelectionModel<Impuesto>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private impuestoServicio: ImpuestoService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listarImpuestos();
  }

  private listarImpuestos(): void {
    this.loading = true;
    this.lstImpuestos = [];
    this.impuestoServicio.listarImpuestos('')
      .subscribe(response => {
        this.lstImpuestos = response as Impuesto[];
        this.dataSource = new MatTableDataSource(this.lstImpuestos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstImpuestos.length;
        this.sortedData = this.lstImpuestos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {
            this.dataSource = new MatTableDataSource(this.lstImpuestos);
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }

  registrarimpuestos() {
    this.router.navigate(['main/dashboard/configuraciones/crearimpuestos']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstImpuestos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    /*this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'calories': return compare(+a.calories, +b.calories, isAsc);
        case 'fat': return compare(+a.fat, +b.fat, isAsc);
        case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
        case 'protein': return compare(+a.protein, +b.protein, isAsc);
        default: return 0;
      }
    });*/
  }

  Ver(id: number){

  }

  Modificar(id: number){
    this.router.navigate(['main/dashboard/configuraciones/crearimpuestos', id]);
  }

  Eliminar(id: number){
    this.bsModalRef = this.modalService.show(MensajeEliminarComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
  
      if (result){
        this.eliminarporcodigo(id);
      }
    });
  }

  eliminarporcodigo(id: number){
    this.loading = true;
    this.impuestoServicio.eliminar(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarImpuestos();
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {

          }
          else if (error.status === 409) {
            this.toastr.info('Opss no puedes eliminar el registro ya que esta haciendo usado', 'Informacion', { enableHtml: true, closeButton: true });
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }

  ExportarExcel(){

  }
  ExportarTxt(){

  }

  Refrescar(){
    this.listarImpuestos();
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
  checkboxLabel(row?: Impuesto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idimpuesto + 1}`;
  }

}

