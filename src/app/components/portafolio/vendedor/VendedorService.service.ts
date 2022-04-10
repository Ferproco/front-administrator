import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vendedor } from '../../model/Vendedor.model';

@Injectable()
export class VendedorService{

  lstVendedores: Vendedor[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }
  listarVendedores(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/vendedor';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
  eliminarVendedor(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/vendedor/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

}
