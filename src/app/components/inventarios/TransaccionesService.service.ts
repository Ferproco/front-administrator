import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Impuesto } from '../model/Impuesto.model';
import { Transacciones } from '../model/Transacciones.model';



@Injectable()
export class TransaccionesService{

  lstTransacciones: Transacciones[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarTransacciones(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/transacciones';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarTransaccion(id: number, transaccion: Transacciones){

    const body = {
      
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/transacciones';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }


}
