import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GrupoArticulo } from '../model/GrupoArticulo.model';



@Injectable()
export class GrupoArticuloService{

  lstGrupoArticulos: GrupoArticulo[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarGrupoArticulos(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/grupoarticulo';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
 

}
