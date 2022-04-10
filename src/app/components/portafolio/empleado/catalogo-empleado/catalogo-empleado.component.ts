import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { Empleado } from 'src/app/components/model/Empleado.model';
import { EmpleadoService } from '../EmpleadoService.service';

@Component({
  selector: 'app-catalogo-empleado',
  templateUrl: './catalogo-empleado.component.html',
  styleUrls: ['./catalogo-empleado.component.css']
})
export class CatalogoEmpleadoComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Empleados';
  lstEmpleados: Empleado[] = [];
  sortedData;
  filtrararticulos = '';

  tipoempleadoconfig = 'T';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  LengthTable = 0;
  idnegocio: number;

  showModalBox: boolean = false;
  PuedeEliminar: boolean = false;

  displayedColumns: string[] = ['select', 'TIPO IDENTIFICACION', 'N° IDENTIFICACION', 'NOMBRE', 'TELEFONO', 'EMAIL', 'TIPO PERSONA', 'ESTATUS', 'ACCION'];
  dataSource: MatTableDataSource<Empleado>;
  selection = new SelectionModel<Empleado>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  bsModalRef: any;
  constructor(private empleadoServicio: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listarEmpleados(this.tipoempleadoconfig);
  }
  private listarEmpleados(tipo: string): void {
    this.loading = true;
    this.lstEmpleados = [];
    this.empleadoServicio.listarEmpleadosPorTipo('', tipo)
      .subscribe(response => {
        const listaempleado = response as Empleado[];
        listaempleado.forEach(element => {
       
            element.nombreprimero = element.nombreprimero   + ' ' +
                                    element.nombresegundo   + ' ' +
                                    element.apellidoprimero + ' ' +
                                    element.apellidosegundo;
         
          this.lstEmpleados.push(element);
        });
        this.dataSource = new MatTableDataSource(this.lstEmpleados);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstEmpleados.length;
        this.sortedData = this.lstEmpleados.slice();
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


  registrarempleados() {
    this.router.navigate(['main/dashboard/portafolio/crearempleado']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstEmpleados.slice();
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

    this.router.navigate(['main/dashboard/portafolio/crearempleado', id]);
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
    this.empleadoServicio.eliminarEmpleado(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarEmpleados(this.tipoempleadoconfig);
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
    this.tipoempleadoconfig = 'T';
    this.listarEmpleados(this.tipoempleadoconfig);
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
  checkboxLabel(row?: Empleado): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cargarempleados(tipo){
    this.tipoempleadoconfig = tipo;
    this.listarEmpleados(this.tipoempleadoconfig);
  }

}
