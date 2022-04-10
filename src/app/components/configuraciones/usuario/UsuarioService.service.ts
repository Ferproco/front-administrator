import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Usuario } from "../../model/Usuario.model";
import * as uuid from 'uuid';
import { StorageService } from "../../auth/login/StorageService.service";
import { Negocio } from "../../model/Negocio.model";

@Injectable()
export class UsuarioService{

  lstCategorias: Usuario[] = [];
  uriapi: string = environment.urlAuthentication;
  uriapiemail: string = environment.UrlServiceEmail;
  public empresa: Negocio;

  constructor(private httpClient: HttpClient,
              private storageService: StorageService){
    this.empresa = this.storageService.getCurrentEmpresa();

  }

  listarUsuarios(){

    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/usuario/'+this.empresa.idnegocio;
    return this.httpClient.get(endpoint, {headers: httpHeaders});
  }

  guardarUsuario(id: number, user: Usuario){

    const myId = uuid.v4();
    const body = {
      accesotoken: '',
      activo: user.activo,
      actualizadoel: null,
      actualizartoken: '',
      borrado: true,
      codigouser: myId,
      creadoel: new Date(),
      email: user.email,
      emailconfirmado: false,
      empresaid: this.empresa.idnegocio,
      esadministrador: user.esadministrador,
      imagen: '',
      nombrecompleto: user.nombrecompleto,
      nombreusuario: user.email,
      ocupacion: user.ocupacion,
      password: user.password,
      telefono: user.telefono,
      telefonoconfirmado: false,
      valido: true,
      vencepassword: null
    };


    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/usuario';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  enviarEmailcrearUsuario(email: string, username: string, password: string){
    const body = {
      email: email,
      username: username,
      password: password
    };

    debugger
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapiemail + 'send_email_crear';
    return this.httpClient.post(endpoint, JSON.stringify(body), {headers: httpHeaders});
  }

  eliminarUsuario(id: number){
    const body = {
      id: Number(id)
    };
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const endpoint: any = this.uriapi + 'seguridad/usuario/' + id;
    return this.httpClient.delete(endpoint, {headers: httpHeaders});
  }
}
