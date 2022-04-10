import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventEmitter } from "events";
import { environment } from "src/environments/environment";
import { StorageService } from "../../auth/login/StorageService.service";
import { Negocio } from "../../model/Negocio.model";
import { Rol } from "../../model/Rol.model";


@Injectable()
export class RolesService {

  lstRoles: Rol[] = [];
  uriapi: string = environment.urlAuthentication;
  value: any;
  public empresa: Negocio;

  constructor(private httpClient: HttpClient,
              private storageService: StorageService) {
    this.empresa = this.storageService.getCurrentEmpresa();
  }

  listarRoles() {
    const body = {

    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/rol/' + this.empresa.idnegocio;
    return this.httpClient.get(endpoint, { headers: httpHeaders });
  }

  eliminar(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/rol/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }

  guardarRol(idIn: number, rol: Rol){

    const body = {
      id: idIn,
      activo: rol.activo,
      actualizadoel: null,
      borrado: false,
      creadoel: new Date(),
      empresaid: this.empresa.idnegocio,
      nombre: rol.nombre,
      descripcion: rol.descripcion
    };

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/rol';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

}
