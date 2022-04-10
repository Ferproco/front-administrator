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
import { Negocio } from 'src/app/components/model/Negocio.model';
import { NegocioService } from '../NegocioService.service';

@Component({
  selector: 'app-catalogo-negocio',
  templateUrl: './catalogo-negocio.component.html',
  styleUrls: ['./catalogo-negocio.component.css']
})
export class CatalogoNegocioComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Empresas';
  lstEmpresas: Negocio[] = [];
  filtrarempresas = '';

  tableSizes = [3, 6, 9, 12];


  LengthTable = 0;
  sortedData;

  bsModalRef: BsModalRef;
  displayedColumns: string[] = ['select', 'Numero', 'Nombre', 'Email', 'Telefono', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Negocio>;
  selection = new SelectionModel<Negocio>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private negocioService: NegocioService,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService) { }

  ngOnInit(): void {

    this.listarEmpresas();
  }

  listarEmpresas() {
    this.loading = true;
    this.lstEmpresas = [];
    this.negocioService.listarEmpresas().subscribe(response => {
      this.lstEmpresas = response as Negocio[];
      this.dataSource = new MatTableDataSource(this.lstEmpresas);
      this.dataSource.paginator = this.paginator;
      this.LengthTable = this.lstEmpresas.length;
      this.sortedData = this.lstEmpresas.slice();
      this.loading = false;
    },
      ((error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 404) {
          this.dataSource = new MatTableDataSource(this.lstEmpresas);
        }
        else {
          this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
            { enableHtml: true, closeButton: true });
        }
      }));
  }

  registrarempresa() {
    this.router.navigate(['main/dashboard/configuraciones/crearempresa']);
  }

  ExportarExcel() {

  }

  ExportarTxt() {

  }

  Refrescar() {
    this.listarEmpresas();
  }

  Importar() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstEmpresas.slice();
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

  Modificar(id: number) {
    this.router.navigate(['main/dashboard/configuraciones/crearempresa', id]);
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
    this.negocioService.eliminarNegocio(id).subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarEmpresas();
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

  checkboxLabel(row?: Negocio): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idnegocio + 1}`;
  }
}
