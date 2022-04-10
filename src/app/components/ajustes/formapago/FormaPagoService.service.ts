import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, ɵConsole } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormaPago } from '../../model/FormaPago.model';

@Injectable()
export class FormaPagoService{

  lstFormaPagos: FormaPago[] = [];
  uriapi: string = environment.UrlTransactional;
  value: any;

  constructor(private httpClient: HttpClient){

  }

  listarFormaPagos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarFormaPago(idp: number, idnegocio: number, formapago: FormaPago){
 
    const body = {
      id: Number(idp),
      nombre: formapago.nombre,
      dias: Number(formapago.dias),
      codnegocio: Number(idnegocio),
      status: formapago.status === 1 ? 'Activo' : 'Inactivo'
    };
   
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  mostrarFormaPago(id: number){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  eliminarFormaPago(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/formapago/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

}
