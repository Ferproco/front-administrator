
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ContactoService } from '../ContactoService.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/components/model/Contacto.model';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent implements OnInit {

  public onClose: Subject<boolean>;
  public onSelect: Subject<number>;
  loading = false;
  lstContactos: Contacto[] = [];
  sortedData;
  LengthTable = 0;
  displayedColumns: string[] = ['TIPO IDENTIFICACION', 'N° IDENTIFICACION', 'NOMBRE', 'TELEFONO', 'EMAIL', 'TIPO PERSONA', 'ESTATUS', 'ACCION'];
  dataSource: MatTableDataSource<Contacto>;
  selection = new SelectionModel<Contacto>(true, []);
  tipopersonaconfig = 'Todos';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bsModalRef: BsModalRef,
              private contactoServicio: ContactoService,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.listarContactos(this.tipopersonaconfig);
    this.onClose = new Subject();
    this.onSelect = new Subject();
  }

  cargarclientes(tipo){
    this.tipopersonaconfig = tipo;
    this.listarContactos(this.tipopersonaconfig);
  }

  Seleccionar(id: number){
    this.onSelect.next(id);
    this.bsModalRef.hide();
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
