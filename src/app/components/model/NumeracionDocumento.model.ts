export class NumeracionDocumento{
   
	public idnumeraciondocumento:number;  
	public codtipodocumento:number;
	public status:string = 'Activo';	    
    public codnegocio:number;
    public nombre:string;
    public resolucion:string;
	public prefijo:string;
	public proximonumerodocumento:number;
	public desdenumero:number;
    public hastanumero:number;
    public principal:string='1';
    public tipodedocumento:string;
   
	    
    constructor(json: any = null){
        if (json !== null) {
            this.idnumeraciondocumento= json.idnumeraciondocumento;  
            this.codtipodocumento= json.codtipodocumento;
            this.status=json.status;	    
            this.codnegocio=json.codnegocio;
            this.nombre=json.nombre;
            this.resolucion=json.resolucion;
            this.prefijo=json.prefijo;
            this.proximonumerodocumento=json.proximonumerodocumento;
            this.desdenumero=json.desdenumero;
            this.hastanumero=json.hastanumero;
            this.principal=json.principal;
            this.tipodedocumento=this.tipodedocumento;
                      
        }

    }
}