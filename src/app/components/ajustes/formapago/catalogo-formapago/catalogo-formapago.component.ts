
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormaPagoService } from '../FormaPagoService.service';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormaPago } from 'src/app/components/model/FormaPago.model';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';

@Component({
  selector: 'app-catalogo-formapago',
  templateUrl: './catalogo-formapago.component.html',
  styleUrls: ['./catalogo-formapago.component.css']
})
export class CatalogoFormapagoComponent implements OnInit, AfterViewInit  {

  loading = false;
  titulo = 'Listado de Forma Pagos';
  lstFormaPagos: FormaPago[] = [];
  filtrarformapago = '';
  LengthTable = 0;
  sortedData;
  idnegocio: number;


  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'Codigo', 'Nombre',  'Dias Plazo' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<FormaPago>;
  selection = new SelectionModel<FormaPago>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formaPagoService: FormaPagoService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) {
                this.idnegocio = 1;
              }

  ngOnInit(): void {
    this.listarFormaPagos();

  }

  ngAfterViewInit() {

  }

  listarFormaPagos() {
    this.loading = true;
    this.lstFormaPagos = [];
    let status = 0;
    this.formaPagoService.listarFormaPagos('')
      .subscribe(response => {
        this.lstFormaPagos = response as any[];
        this.dataSource = new MatTableDataSource(this.lstFormaPagos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstFormaPagos.length;
        this.sortedData = this.lstFormaPagos.slice();
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

  registrarformapago() {
    this.router.navigate(['/main/dashboard/ajustes/crearformapagos']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    const data = this.lstFormaPagos.slice();
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

    this.router.navigate(['/main/dashboard/ajustes/crearformapagos', id]);
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
    this.loading = true;
    this.formaPagoService.eliminarFormaPago(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarFormaPagos();
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
    this.listarFormaPagos();
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
  checkboxLabel(row?: FormaPago): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
