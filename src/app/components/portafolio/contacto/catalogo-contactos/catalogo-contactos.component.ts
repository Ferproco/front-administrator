import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { Contacto } from 'src/app/components/model/Contacto.model';
import { ContactoService } from '../ContactoService.service';

@Component({
  selector: 'app-catalogo-contactos',
  templateUrl: './catalogo-contactos.component.html',
  styleUrls: ['./catalogo-contactos.component.css']
})
export class CatalogoContactosComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Contactos';
  lstContactos: Contacto[] = [];
  sortedData;
  LengthTable = 0;

  tipopersonaconfig = 'Todos';

  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'TIPO IDENTIFICACION', 'N° IDENTIFICACION', 'NOMBRE', 'TIPO PERSONA', 'ESTATUS', 'ACCION'];
  dataSource: MatTableDataSource<Contacto>;
  selection = new SelectionModel<Contacto>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contactoServicio: ContactoService,
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listarContactos(this.tipopersonaconfig);
  }

  private listarContactos(tipo: string): void {
    this.loading = true;
    this.lstContactos = [];
    this.contactoServicio.listarContactosPorTipoCOntacto('', tipo)
      .subscribe(response => {
        const listacontacto = response as Contacto[];
        listacontacto.forEach(element => {
          if (element.nombreprimero === '') {
            element.nombreprimero = element.razonsocial;
          }
          else {
            element.nombreprimero = element.nombreprimero   + ' ' +
                                    element.nombresegundo   + ' ' +
                                    element.apellidoprimero + ' ' +
                                    element.apellidosegundo;
          }
          this.lstContactos.push(element);
        });
        this.dataSource = new MatTableDataSource(this.lstContactos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstContactos.length;
        this.sortedData = this.lstContactos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {
            this.dataSource = new MatTableDataSource(this.lstContactos);
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }


  registrarcontactos() {
    this.router.navigate(['main/dashboard/portafolio/crearcontacto']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstContactos.slice();
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
    this.loading = true;
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
        }));
  }

  ExportarExcel() {

  }
  ExportarTxt() {

  }
  Refrescar() {
    this.tipopersonaconfig = 'T';
    this.listarContactos(this.tipopersonaconfig);
  }
  Importar() {

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
  checkboxLabel(row?: Contacto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cargarclientes(tipo){
    this.tipopersonaconfig = tipo;
    this.listarContactos(this.tipopersonaconfig);
  }

}
