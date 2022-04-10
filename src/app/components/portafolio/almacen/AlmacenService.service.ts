import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Almacen } from '../../model/Almacen.model';


@Injectable()
export class AlmacenService{

  lstAlmacenes: Almacen[] = [];
  uriapi: string = environment.UrlTransactional;
  value: any;
  
  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){

  }

  listarAlmacenes(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarAlmacen(id: number,idnegocio:number, almacen: Almacen){

    const body = {
      idalmacen: Number(id),
      codalmacen:almacen.codalmacen,
      codnegocio: Number(idnegocio),
      nombre: almacen.nombre,
      principal: Number(almacen.principal) === 1 ? true : false,
      tipoalmacen:almacen.tipoalmacen,
      direccion: almacen.direccion,
      ubicacion:almacen.ubicacion,
      status: Number(almacen.status) === 1 ? 'Activo' : 'Inactivo',

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarAlmacen(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarAlmacen(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/almacen/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

}
