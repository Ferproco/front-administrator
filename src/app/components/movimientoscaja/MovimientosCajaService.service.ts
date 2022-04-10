import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/Cliente.model';
import { MovimientosCaja } from '../model/MovimientosCaja.model';


@Injectable()
export class MovimientosCajaService{

  lstMovimientosCajas: MovimientosCaja[] = [];
  uriapi: string = environment.UrlTransactional;

  constructor(private httpClient: HttpClient){

  }

  listarMovimientosCajas(codnegocio: string){
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/movimientoscaja';
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }


}
