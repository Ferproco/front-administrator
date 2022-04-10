import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/components/model/Marca.model';
import { MarcaService } from '../MarcaService.service';

@Component({
  selector: 'app-catalogo-marca',
  templateUrl: './catalogo-marca.component.html',
  styleUrls: ['./catalogo-marca.component.css']
})
export class CatalogoMarcaComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Marcas';
  lstMarcas: Marca[] = [];
  LengthTable = 0;
  sortedData;

  displayedColumns: string[] = ['Codigo', 'Nombre', 'Status', 'Acción'];
  dataSource: MatTableDataSource<Marca>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private  marcaServicio: MarcaService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarMarcas();
  }

  private listarMarcas(): void {
    this.loading = true;
    this.marcaServicio.listarMarcas('')
      .subscribe(response => {
        this.lstMarcas = response as Marca[];
        this.dataSource = new MatTableDataSource(this.lstMarcas);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstMarcas.length;
        this.sortedData = this.lstMarcas.slice();
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

  registrarmarcas() {
    this.router.navigate(['/main/dashboard/portafolio/crearmarca']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.lstMarcas.slice();
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

  Ver(){

  }

  Modificar(){

  }

  Eliminar(){

  }

  ExportarExcel(){

  }
  ExportarTxt(){

  }
  Refrescar(){
    this.listarMarcas();
  }
  Importar(){

  }


}
