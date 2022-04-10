export class Almacen {
  public idalmacen: number;
  public codalmacen: string;
  public codnegocio: string;
  public nombre: string;
  public principal: string = '0';
  public tipoalmacen: string;
  public direccion: string;
  public ubicacion:string;
  public status: string='Activo';
  

  constructor(json: any = null) {

    if (json !== null) {
      this.codalmacen = json.codalmacen;
      this.codnegocio = json.codnegocio;
      this.nombre = json.nombre;
      this.principal = json.principal;
      this.tipoalmacen = json.tipoalmacen;
      this.direccion = json.direccion;
      this.idalmacen = json.idalmacen;
      this.ubicacion=json.ubicacion;
      this.status = json.status;
    }
  }
}
