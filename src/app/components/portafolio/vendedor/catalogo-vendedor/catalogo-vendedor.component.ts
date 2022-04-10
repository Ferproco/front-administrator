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
import { Vendedor } from 'src/app/components/model/Vendedor.model';
import { VendedorService } from '../VendedorService.service';

@Component({
  selector: 'app-catalogo-vendedor',
  templateUrl: './catalogo-vendedor.component.html',
  styleUrls: ['./catalogo-vendedor.component.css']
})
export class CatalogoVendedorComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Vendedores';
  lstVendedores: Vendedor[] = [];

  filtrarvendedores = '';

  LengthTable = 0;
  sortedData;
  idnegocio: number;
  bsModalRef: BsModalRef;

  displayedColumns: string[] = ['select', 'Codigo', 'Nombre',  'Correoe', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Vendedor>;
  selection = new SelectionModel<Vendedor>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private vendedorService: VendedorService,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService) {
                this.idnegocio = 1;
               }



  ngOnInit(): void {
    this.listarVendedores();
  }
  listarVendedores(){
    this.loading = true;
    this.lstVendedores = [];
    let status = 0;
    this.vendedorService.listarVendedores('')
   .subscribe(response => {
    const listavendedores = response as any[];
    listavendedores.forEach(element => {
          if (element.status === 'ACTIVO') {
            status = 1;
          }
          else {
            status = 0;
          }

        });
        this.dataSource = new MatTableDataSource(this.lstVendedores);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstVendedores.length;
        this.sortedData = this.lstVendedores.slice();
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

 registrarvendedor(){
  this.router.navigate(['ventas/crearvendedores']);
 }

 ngAfterViewInit() {

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


sortData(sort: Sort) {
  const data = this.lstVendedores.slice();
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

 // this.router.navigate(['configuracion/crearformapagos', id]);
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
  this.vendedorService.eliminarVendedor(id)
    .subscribe(response => {
      const respuesta = response;
      this.loading = false;
      this.listarVendedores();
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

ExportarExcel(){

}
ExportarTxt(){

}
Refrescar(){
  this.listarVendedores();
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
checkboxLabel(row?: Vendedor): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}

}
