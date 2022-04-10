import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from 'src/app/components/model/Contacto.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TipoIdentificacionService{

  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarTipoIdentificaciones(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoidentificacion';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }
}
