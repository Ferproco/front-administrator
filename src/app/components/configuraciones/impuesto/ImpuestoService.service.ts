import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Impuesto } from '../../model/Impuesto.model';




@Injectable()
export class ImpuestoService{

  lstImpuestos: Impuesto[] = [];
  uriapi: string =  environment.UrlTransactional;
  value: any;
  Eliminar = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient){

  }

  listarImpuestos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarImpuesto(id: number, idnegocio: number, impuesto: Impuesto){

    const body = {
      idimpuesto: Number(id),
      nombreimpuesto: impuesto.nombreimpuesto,
      normal: Number(impuesto.normal),
      recargo: 0,
      fechaini: new Date(impuesto.fechaini),
      fechafin: new Date(impuesto.fechaini),
      status: Number(impuesto.status) === 1 ? 'Activo' : 'Inactivo',
      codnegocio: Number(idnegocio),
      idtipoimpuesto: Number(impuesto.idtipoimpuesto)
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminar(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
  mostrarImpuesto(id: number){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/impuesto/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
