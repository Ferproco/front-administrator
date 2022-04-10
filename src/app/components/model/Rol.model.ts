export class Rol{

  public id: number;
	public nombre: string;
	public creadoel:  Date = new Date();
	public actualizadoel: Date = new Date();
	public activo: boolean = true;
	public borrado: boolean;
	public descripcion: string;

  constructor(json: any = null){
    if (json !== null) {
      this.id = json.id;
      this.nombre= json.nombre;
      this.creadoel = json.creadoel;
      this.actualizadoel = json.actualizadoel;
      this.activo = json.activo;
      this.borrado = json.borrado;
      this.descripcion = json.descripcion;
    }
  }
}
