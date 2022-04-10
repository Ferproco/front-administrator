import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MensajeEliminarComponent } from 'src/app/components/mensajeria/mensaje-eliminar/mensaje-eliminar.component';
import { NumeracionDocumento } from 'src/app/components/model/NumeracionDocumento.model';
import { NumeracionDocumentoService } from '../NumeracionDocumentoService.service';

@Component({
  selector: 'app-catalogo-numeraciondocumento',
  templateUrl: './catalogo-numeraciondocumento.component.html',
  styleUrls: ['./catalogo-numeraciondocumento.component.css']
})
export class CatalogoNumeraciondocumentoComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Impuestos';
  lstNumeracionDocumentos: NumeracionDocumento[] = [];
  LengthTable = 0;
  sortedData;
  idnegocio: number;
  showModalBox: boolean = false;
  PuedeEliminar: boolean = false;
  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'Tipo Documento', 'Nombre', 'Prefijo', 'Siguiente Numero' , 'Status', 'Acción'];
  dataSource: MatTableDataSource<NumeracionDocumento>;
  selection = new SelectionModel<NumeracionDocumento>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private numeracionServicio: NumeracionDocumentoService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
    ) {

      this.idnegocio = 1;
    }

  ngOnInit(): void {
    this.listarNumeracionDocumentos()
  }

  private listarNumeracionDocumentos(): void {
    this.loading = true;
    this.lstNumeracionDocumentos = [];
    this.numeracionServicio.listarNumeracionDocumentos('')
      .subscribe(response => {
        this.lstNumeracionDocumentos = response as NumeracionDocumento[];
        this.dataSource = new MatTableDataSource(this.lstNumeracionDocumentos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstNumeracionDocumentos.length;
        this.sortedData = this.lstNumeracionDocumentos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {
            this.dataSource = new MatTableDataSource(this.lstNumeracionDocumentos);
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }

  registrarNumeracionDocumento() {
    this.router.navigate(['main/dashboard/configuraciones/crearnumeraciondocumento']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstNumeracionDocumentos.slice();
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
    if (0){
      // Dont open the modal
      this.showModalBox = false;
    } else {
       // Open the modal
       this.showModalBox = true;
    }
  }

  Modificar(id: number){
    //this.router.navigate(['inventario/creararticulo', id]);
    this.router.navigate(['main/dashboard/configuraciones/crearnumeraciondocumento', id]);
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
    this.numeracionServicio.eliminarNumeracionDocumento(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarNumeracionDocumentos();
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
    this.listarNumeracionDocumentos();
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
  checkboxLabel(row?: NumeracionDocumento): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idnumeraciondocumento + 1}`;
  }
  ngAfterViewInit() {

  }
}
