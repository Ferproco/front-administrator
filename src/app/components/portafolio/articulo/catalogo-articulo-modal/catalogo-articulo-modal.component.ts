import { Articulo } from './../../../model/Articulo.model';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { ArticuloService } from '../ArticuloService.service';

@Component({
  selector: 'app-catalogo-articulo-modal',
  templateUrl: './catalogo-articulo-modal.component.html',
  styleUrls: ['./catalogo-articulo-modal.component.css']
})
export class CatalogoArticuloModalComponent implements OnInit {
  public onClose: Subject<boolean>;
  public onSelect: Subject<number>;
  loading = false;
  lstArticulos: Articulo[] = [];
  sortedData;
  LengthTable = 0;
  //displayedColumns: string[] = ['TIPO IDENTIFICACION', 'N° IDENTIFICACION', 'NOMBRE', 'TELEFONO', 'EMAIL', 'TIPO PERSONA', 'ESTATUS', 'ACCION'];
  displayedColumns: string[] = ['Codigo', 'Nombre',  'Categoria' ,'Precio', 'Und Medida'  ,'Impuesto','Status', 'Accion'];
  dataSource: MatTableDataSource<Articulo>;
  selection = new SelectionModel<Articulo>(true, []);
  tipoproductoconfig = 'T';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private bsModalRef: BsModalRef,
    private articuloServicio: ArticuloService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.listarArticulos(this.tipoproductoconfig);
    this.onClose = new Subject();
    this.onSelect = new Subject();
  }

  cargararticulos(tipo){
    this.tipoproductoconfig = tipo;
    this.listarArticulos(this.tipoproductoconfig);
  }

  Seleccionar(id: number){
    this.onSelect.next(id);
    this.bsModalRef.hide();
  }

  private listarArticulos(tipo: string): void {
    this.loading = true;
    this.lstArticulos = [];
    this.articuloServicio.listarArticulosPorTipo(tipo)
      .subscribe(response => {
        const listaarticulo = response as Articulo[];
        listaarticulo.forEach(element => {


            element.nomarticulo = element.nomarticulo;

          this.lstArticulos.push(element);
        });
        this.dataSource = new MatTableDataSource(this.lstArticulos);
        this.dataSource.paginator = this.paginator;
        this.LengthTable = this.lstArticulos.length;
        this.sortedData = this.lstArticulos.slice();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
}

public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
}


}
