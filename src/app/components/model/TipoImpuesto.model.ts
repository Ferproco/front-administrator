export class TipoImpuesto{
    public id: number;
    public nombretipoimpuesto: string;
    public codpais: number ;
    public status: string ='Activo';

    constructor(json: any = null){
      if (json !== null) {
       this.id = json.id;
       this.nombretipoimpuesto = json.nombretipoimpuesto;
       this.codpais = json.codpais;
       this.status = json.status;
      }
    }
}
