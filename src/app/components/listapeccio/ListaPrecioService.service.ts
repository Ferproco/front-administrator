import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Departamento } from '../model/Departamento.model';
import { ListaPrecio } from '../model/ListaPrecio.model';

@Injectable()
export class ListaPrecioService{

  lstListaPrecios: ListaPrecio[] = [];
  uriapi: string = environment.UrlTransactional;
  constructor(private httpClient: HttpClient){

  }

  listarListaPrecios(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/listaprecio';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
