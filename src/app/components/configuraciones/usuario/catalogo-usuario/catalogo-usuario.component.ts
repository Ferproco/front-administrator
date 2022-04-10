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
import { Usuario } from '../../../model/Usuario.model';
import { UsuarioService } from '../UsuarioService.service';

@Component({
  selector: 'app-catalogo-usuario',
  templateUrl: './catalogo-usuario.component.html',
  styleUrls: ['./catalogo-usuario.component.css']
})
export class CatalogoUsuarioComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Usuarios';
  lstUsuarios: Usuario[] = [];
  filtrarusuarios = '';

  tableSizes = [3, 6, 9, 12];


  LengthTable = 0;
  sortedData;

  bsModalRef: BsModalRef;
  displayedColumns: string[] = ['select', 'Codigo', 'Usuario', 'Nombre', 'Telefono', 'Ocupacion', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Usuario>;
  selection = new SelectionModel<Usuario>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.loading = true;
    this.lstUsuarios = [];
    this.usuarioService.listarUsuarios().subscribe(response => {
      this.lstUsuarios = response as Usuario[];
      this.dataSource = new MatTableDataSource(this.lstUsuarios);
      this.dataSource.paginator = this.paginator;
      this.LengthTable = this.lstUsuarios.length;
      this.sortedData = this.lstUsuarios.slice();
      this.loading = false;
    },
      ((error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 404) {
          this.dataSource = new MatTableDataSource(this.lstUsuarios);
        }
        else {
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }
      }));
  }

  registrarusuarios() {
    this.router.navigate(['main/dashboard/configuraciones/crearusuario']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstUsuarios.slice();
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

  Modificar(id: number) {
    this.router.navigate(['main/dashboard/configuraciones/crearusuario', id]);
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
    this.usuarioService.eliminarUsuario(id).subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarUsuarios();
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
  ExportarExcel() {

  }
  ExportarTxt() {

  }
  Refrescar() {
    this.listarUsuarios();
  }
  Importar() {

  }

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
  checkboxLabel(row?: Usuario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
