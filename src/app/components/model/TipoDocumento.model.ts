export class TipoDocumento{
   
	public idtipodocumento:number;  
	public nombre:string;
    public status:string;
    public codpais: number;
    
constructor(json: any = null){

    if (json !== null) {
        this.idtipodocumento = json.idtipodocumento;  
        this.nombre          = json.nombre;
        this.status          = json.status;
        this.codpais         = json.codpais;

    }
}


}