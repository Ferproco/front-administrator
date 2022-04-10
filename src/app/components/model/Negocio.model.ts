

export class Negocio {

  public idnegocio: number;
  public codnegocio: string;
  public nombre: string;
  public direccion: string;
  public telefono: string;
  public email: string;
  public telefonomovil: string;
  public web: string;
  public imagen: string;
  public mascaracontable: string;
  public contribuyente: string;
  public habilitado: boolean = true;
  public cantidadusuario: number = 1;
  public tiempocierresesion: number = 1;
  public dominio: string;
  public ip: string;
  public puerto: number;
  public creadoel: Date = new Date();
  public actualizadoel: Date = new Date();
  public codpais: number;

  constructor(json: any = null) {
    if (json !== null) {
      this.idnegocio       = json.idnegocio;
      this.codnegocio      = json.codnegocio;
      this.nombre          = json.nombre;
      this.direccion       = json.direccion;
      this.telefono        = json.telefono;
      this.email           = json.email;
      this.telefonomovil   = json.telefonomovil;
      this.web             = json.web;
      this.imagen          = json.imagen;
      this.mascaracontable = json.mascaracontable;
      this.contribuyente   = json.contribuyente;
      this.habilitado      = json.habilitado;
      this.creadoel        = json.creadoelin;
      this.actualizadoel   = json.actualizadoelin;
      this.codpais         = json.codpais;
    }
  }
}
