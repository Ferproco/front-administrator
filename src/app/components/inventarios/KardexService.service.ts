import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kardex } from '../model/Kardex.model';






@Injectable()
export class KardexService{

  lstKardex: Kardex[] = [];
  uriapi: string = environment.UrlTransactional;
  value: any;

  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){ }

  listarKardex(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/kardex';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 /* listarArticulosPorTipo(codnegocio: string, tipo: string){
    let tipoitems = 0;
    if (tipo === 'P'){
      tipoitems = 1;
    }
    else if (tipo === 'S'){
      tipoitems = 2;
    }
    else if (tipo === 'M'){
      tipoitems = 3;
    }
    else if (tipo === 'G'){
      tipoitems = 4;
    }
    else if (tipo === 'T'){
      tipoitems = 5;
    }
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo/tipo/' + tipoitems;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }*/
 /* guardarKardex(idIn: number, idnegocio: number, kardex: Kardex){
    const body = {
      id: Number(idIn),
      codnegocio: Number(idnegocio),
      codigo: articulo.codigo,
      nomarticulo: articulo.nomarticulo,
      codmarca: Number(articulo.codmarca),
      codfamilia: Number(articulo.codfamilia),
      codunidadmedida: Number(articulo.codunidadmedida),
      codimpuesto: Number(articulo.codimpuesto),
      preciosugerido: Number(articulo.preciosugerido),
      referencia: articulo.referencia,
      codigobarraprincipal:articulo.codigobarraprincipal,
      serial:articulo.serial,
      descripcionlarga:articulo.descripcionlarga,
      status: Number(articulo.status) === 1 ? 'ACTIVO' : 'INACTIVO',
      stockminimo: Number(articulo.stockminimo),
      stockmaximo: Number(articulo.stockmaximo),
      cantidadreorden: Number(articulo.cantidadreorden),
      peso: Number(articulo.peso),
      talla: Number(articulo.talla),
      color: articulo.color,
      codtipoproducto: Number(articulo.codtipoproducto),
      tipoiva: articulo.tipoiva,
      ivaincluido: articulo.ivaincluido,
      esimpoconsumo: articulo.esimpoconsumo,
      valorimpoconsumo:Number(articulo.valorimpoconsumo),
      porcentajeimpoconsumo:Number(articulo.porcentajeimpoconsumo),

    };
   
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/articulo';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }*/
 /* eliminarKardex(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/kardex/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }*/


  /*mostrarkardex(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/kardex/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }*/
}
