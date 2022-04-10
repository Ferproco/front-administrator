import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../model/Proveedor.model';


@Injectable()
export class ProveedorService{

  lstProveedores: Proveedor[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarProveedores(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/proveedor';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
