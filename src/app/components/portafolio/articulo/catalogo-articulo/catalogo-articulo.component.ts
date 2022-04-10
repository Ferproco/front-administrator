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
import { Articulo } from 'src/app/components/model/Articulo.model';
import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-catalogo-articulo',
  templateUrl: './catalogo-articulo.component.html',
  styleUrls: ['./catalogo-articulo.component.css']
})
export class CatalogoArticuloComponent implements OnInit {

  loading = false;
  titulo = 'Listado de Articulos';
  lstArticulos: Articulo[] = [];
  sortedData;
  filtrararticulos = '';

  tipoproductoconfig = 'T';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  LengthTable = 0;
  bsModalRef: BsModalRef;

  showModalBox: boolean = false;
  PuedeEliminar: boolean = false;

  displayedColumns: string[] = ['Codigo', 'Nombre',  'Tipo', 'Categoria' ,'Precio', 'Und Medida' ,'Impuesto','Status', 'Acción'];
  dataSource: MatTableDataSource<Articulo>;
  selection = new SelectionModel<Articulo>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private articuloServicio: ArticuloService,
              private toastr: ToastrService,
              private router: Router,
              private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.listarArticulosPorTipo(this.tipoproductoconfig);

  }
  ngAfterViewInit() {

  }
  listarArticulos() {
    this.loading = true;
    this.lstArticulos = [];
    let status = 0;
    this.articuloServicio.listarArticulos()
      .subscribe(response => {
        this.lstArticulos = response as Articulo[];        
        this.dataSource = new MatTableDataSource(this.lstArticulos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstArticulos.length;
        this.sortedData = this.lstArticulos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {
            this.dataSource = new MatTableDataSource(this.lstArticulos);
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }
  private listarArticulosPorTipo(tipo: string): void {
    this.loading = true;
    this.lstArticulos = [];
    let status = 0;
    this.articuloServicio.listarArticulosPorTipo(tipo)
      .subscribe(response => {
        this.lstArticulos = response as Articulo[];

        this.dataSource = new MatTableDataSource(this.lstArticulos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstArticulos.length;
        this.sortedData = this.lstArticulos.slice();
        this.loading = false;
      },
        ((error: HttpErrorResponse) => {
          this.loading = false;
          if (error.status === 404) {
            this.dataSource = new MatTableDataSource(this.lstArticulos);
          }
          else {
            this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
              { enableHtml: true, closeButton: true });
          }
        }));
  }

  registrararticulos() {
    this.router.navigate(['main/dashboard/portafolio/creararticulo']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    const data = this.lstArticulos.slice();
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

    this.router.navigate(['main/dashboard/portafolio/creararticulo', id]);
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
    this.articuloServicio.eliminarArticulo(id)
      .subscribe(response => {
        const respuesta = response;
        this.loading = false;
        this.listarArticulosPorTipo(this.tipoproductoconfig);
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

  Refrescar() {
    this.tipoproductoconfig = 'T';
    this.listarArticulosPorTipo(this.tipoproductoconfig);
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
  checkboxLabel(row?: Articulo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cargararticulos(tipo){
    this.tipoproductoconfig = tipo;
    this.listarArticulosPorTipo(this.tipoproductoconfig);
  }


}
