export class FormaPago {
  id: number;
  nombre: string;
  codnegocio: number;
  dias: number;
  status: number;


  constructor(id: number, nombre: string, dias: number, codnegocio: number, status: number) {
    this.id = id;
    this.nombre = nombre;
    this.codnegocio = codnegocio;
    this.dias = dias;
    this.status = status;
  }
}
