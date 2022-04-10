import { Component, OnInit } from '@angular/core';
import { MovimientosCaja } from '../../model/MovimientosCaja.model';
import { MovimientosCajaService } from '../MovimientosCajaService.service';

@Component({
  selector: 'app-catalogo-movimientoscaja',
  templateUrl: './catalogo-movimientoscaja.component.html',
  styleUrls: ['./catalogo-movimientoscaja.component.css']
})
export class CatalogoMovimientoscajaComponent implements OnInit {


  loading = false;
  titulo = 'Listado de Movimientos de Caja';
  lstMovimientosCaja: MovimientosCaja[] = [];
  constructor(private movimientosCajaService: MovimientosCajaService) { }

  POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;
  tableSizes = [3, 6, 9, 12]

  ngOnInit(): void {
    this.listarMovimientosCaja();
  }

  listarMovimientosCaja(){
    this.loading = true;
    this.movimientosCajaService.listarMovimientosCajas('')
   .subscribe(response => {
     this.lstMovimientosCaja = response as MovimientosCaja[];
     this.loading = false;
   });
 }

 onTableDataChange(event){
  this.page = event;
  this.lstMovimientosCaja;
}

onTableSizeChange(event): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.lstMovimientosCaja;
}
}
