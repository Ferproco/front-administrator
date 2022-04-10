export class CuentasxCobrar {

  public id: number;
  public codnegocio: number;
  public codcliente: number;
  public numerofactura: string;
  public fechavencimiento: Date;
  public tipo: string;
  public concepto: string;
  public monto: number;
  public status: string;
  public origen: string;
  public fechaemision: Date;
  public referencia: string;
  public codigocontable: string;

  constructor(json: any = null) {
    if (json !== null) {
      this.id = json.id;
      this.codnegocio = json.codnegocio;
      this.codcliente = json.codcliente;
      this.numerofactura = json.numerofactura;
      this.fechavencimiento = json.fechavencimiento;
      this.tipo = json.tipo;
      this.concepto = json.concepto;
      this.monto = json.monto;
      this.status = json.status;
      this.origen = json.origen;
      this.fechaemision = json.fechaemision;
      this.referencia = json.referencia;
      this.codigocontable = json.codigocontable;
    }
  }

}



