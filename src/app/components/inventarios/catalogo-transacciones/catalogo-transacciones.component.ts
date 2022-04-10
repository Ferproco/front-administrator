import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Transacciones } from '../../model/Transacciones.model';
import { TransaccionesService } from '../TransaccionesService.service';

@Component({
  selector: 'app-catalogo-transacciones',
  templateUrl: './catalogo-transacciones.component.html',
  styleUrls: ['./catalogo-transacciones.component.css']
})
export class CatalogoTransaccionesComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Transacciones';
  lstTransacciones: Transacciones[] = [];
  filtrartransacciones = '';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];
  constructor(private transaccionesServicio: TransaccionesService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTransacciones();
  }

  listarTransacciones(){
    this.loading = true;
    this.transaccionesServicio.listarTransacciones('')
   .subscribe(response => {
     this.lstTransacciones = response as Transacciones[];
     this.loading = false;
    },
    error => {
     this.loading = false;
     this.toastr.error('Opss ocurrio un error, no hay comunicación con el servicio ' + '<br>' + error.message, 'Error',
      { enableHtml: true, closeButton: true });
   });
 }
 onTableDataChange(event){
  this.page = event;
  this.lstTransacciones;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstTransacciones;
}
registrartransacciones() {
  this.router.navigate(['inventario/listartransacciones']);
    }

}
