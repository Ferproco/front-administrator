import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/login/StorageService.service';
import { Negocio } from '../../model/Negocio.model';
import { TipoImpuesto } from '../../model/TipoImpuesto.model';



@Injectable()
export class TipoImpuestoService{

  lstTipoImpuestos: TipoImpuesto[] = [];
 
  uriapi: string = environment.UrlTransactional;
  public empresa: Negocio;

  constructor(private httpClient: HttpClient,
              private storageService: StorageService){

  }

  listarTipoImpuestos<T>(): Observable<T>{
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto';
    return this.httpClient.get<T>(endpoint, {headers: httpHeaders})
  }


  mostrarTipoImpuesto(id: number){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto/' + id;
    return this.httpClient.get(endpoint, {headers: httpHeaders})
   
  }

  guardarTipoImpuesto(id: number, tipoimpuesto: TipoImpuesto){

    const body = {
      id: id,
      nombretipoimpuesto: tipoimpuesto.nombretipoimpuesto,
      codpais : this.storageService.getCurrentPais(),
      status: Number(tipoimpuesto.status) === 1 ? 'Activo' : 'Inactivo'
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarTipoImpuestos(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'api/tipoimpuesto/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

}
