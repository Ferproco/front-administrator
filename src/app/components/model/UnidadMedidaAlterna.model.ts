export class UnidadMedidaAlterna{
    public id:number;
    public codunidadmedidaalterna:number;
    public articulo_id: number;
    public valorconversion:number;
    public codnegocio:number;
    public codunidadminima:number;
    
    constructor(json: any = null){
        if(json !== null) {

            this.id= json.id;
            this.codunidadmedidaalterna = json.codunidadmedidaalterna;
            this.articulo_id = json.articulo_id;
            this.valorconversion =  json.valorconversion;
            this.codnegocio = json.codnegocio;
            this.codunidadminima = json.codunidadminima;


        }
    }
}