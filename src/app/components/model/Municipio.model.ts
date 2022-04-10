export class Municipio{
    id:number;	
	codigo:string;	
    nombre:string;	
	status:string;	
    codciudad:string;	
    coddepartamento:number;
	
    constructor(id:number, codigo:string,nombre:string,status:string,codciudad:string,coddepartamento:number){
     this.id=id;	
	this.codigo=codigo;	
    this.nombre=nombre;	
	this.status=status;	
    this.codciudad=codciudad;	
    this.coddepartamento=coddepartamento;


    }
}