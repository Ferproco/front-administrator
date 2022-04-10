import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from '../../model/Proveedor.model';
import { ProveedorService } from '../ProveedorService.service';


@Component({
  selector: 'app-catalogo-proveedor',
  templateUrl: './catalogo-proveedor.component.html',
  styleUrls: ['./catalogo-proveedor.component.css']
})
export class CatalogoProveedorComponent implements OnInit {
  loading = false;
  titulo = 'Listado de Proveedores';
  lstProveedores: Proveedor[] = [];
  filtrarproveedores = '';

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12];

  constructor(private proveedorService: ProveedorService,
              private router: Router,
              private toastr: ToastrService) { }


  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores(){
    this.loading = true;
    this.proveedorService.listarProveedores('')
   .subscribe(response => {
     this.lstProveedores = response as Proveedor[];
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
  this.lstProveedores;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstProveedores;
}
registrarproveedores() {
  this.router.navigate(['compras/crearproveedor']);
    }

}



