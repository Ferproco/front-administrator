export class DetallesDocumentoVenta {
  public id: number;
  public codnegocio: number;
  public coddocumentoventa: number = 0;
  public codarticulo: number;
  public codimpuesto: number = 0;
  public codunidadmedida: number = 0;
  public codalmacen: number = 0;
  public cantidad: number = 1;
  public preciounitariosiniva: number = 0;
  public montototalconiva: number = 0;
  public baseimponible: number = 0;
  public porcentajedescuento: number = 0;
  public montodescuento: number = 0;
  public porcentajeimpuesto: number = 0;
  public montoimpuesto: number = 0;
  public islr: number;
  public porcentajeislr: number;
  public status: string;
  public tipoarticulo: string;
  public fecha: Date = new Date();
  public serial: string;
  public garantia: string;
  public tipodocumento: string;

  constructor(json: any = null) {
    if (json !== null) {
      this.id = json.id;
      this.codnegocio = json.codnegocio;
      this.coddocumentoventa = json.coddocumentoventa;
      this.codarticulo = json.codarticulo;
      this.codimpuesto = json.codimpuesto;
      this.codunidadmedida = json.codunidadmedida;
      this.codalmacen = json.codalmacen;
      this.cantidad = json.cantidad;
      this.preciounitariosiniva = json.preciounitariosiniva;
      this.montototalconiva = json.montototalconiva;
      this.baseimponible = json.baseimponible;
      this.porcentajedescuento = json.porcentajedescuento;
      this.montodescuento = json.montodescuento;
      this.porcentajedescuento = json.porcentajeimpuesto;
      this.montoimpuesto = json.montoimpuesto;
      this.islr = json.islr;
      this.porcentajeislr = json.porcentajeislr;
      this.status = json.status;
      this.tipoarticulo = json.tipoarticulo;
      this.fecha = json.fecha;
      this.serial = json.serial;
      this.garantia = json.garantia;
      this.tipodocumento = json.tipodocumento;
    }
  }
}
