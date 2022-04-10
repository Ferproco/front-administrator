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
import { Rol } from 'src/app/components/model/Rol.model';
import { RolesService } from '../RolesService.service';

@Component({
  selector: 'app-catalogo-roles',
  templateUrl: './catalogo-roles.component.html',
  styleUrls: ['./catalogo-roles.component.css']
})
export class CatalogoRolesComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Roles';
  filtrarroles = '';
  lstRoles: Rol[] = [];
  tableSizes = [3, 6, 9, 12];
  LengthTable = 0;
  sortedData;

  bsModalRef: BsModalRef;
  displayedColumns: string[] = ['select', 'Numero', 'Nombre', 'Email', 'Telefono', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Rol>;
  selection = new SelectionModel<Rol>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private rolesService: RolesService) { }

  ngOnInit(): void {
    this.listarRoles();
  }

  private listarRoles(): void {
    this.loading = true;
    this.lstRoles = [];
    this.rolesService.listarRoles().subscribe(response => {
      this.lstRoles = response as Rol[];
      this.dataSource = new MatTableDataSource(this.lstRoles);
      this.dataSource.paginator = this.paginator;
      this.LengthTable = this.lstRoles.length;
      this.sortedData = this.lstRoles.slice();
      this.loading = false;
    },
      ((error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 404) {
          this.dataSource = new MatTableDataSource(this.lstRoles);
        }
        else {
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }
      }));
  }

  registrarroles() {
    this.router.navigate(['main/dashboard/configuraciones/crearrol']);
  }

  Ver(id: number) {

  }

  Modificar(id: number) {
    this.router.navigate(['main/dashboard/configuraciones/crearrol', id]);
  }

  Eliminar(id: number) {
    this.bsModalRef = this.modalService.show(MensajeEliminarComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.eliminarporcodigo(id);
      }
    });
  }

  eliminarporcodigo(id: number) {
    this.loading = true;
    this.rolesService.eliminar(id).subscribe(response => {
      const respuesta = response;
      this.loading = false;
      this.listarRoles();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstRoles.slice();
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

  ExportarExcel() {

  }
  ExportarTxt() {

  }
  Refrescar() {
    this.listarRoles();
  }
  Importar() {

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
  checkboxLabel(row?: Rol): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}
