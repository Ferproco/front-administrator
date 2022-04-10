export class Usuario{

    public id: number;
	public codigouser: string;
	public nombrecompleto: string;
	public nombreusuario: string;
	public password: string;
	public imagen: string;
	public email: string;
	public emailconfirmado: boolean;
	public telefono: string;
	public telefonoconfirmado: boolean;
	public ocupacion: string;
	public creadoel: Date;
	public actualizadoel: Date;	
	public activo: boolean;	
	public borrado: boolean;	
	public valido: boolean;	
	public esadministrador: boolean = false;
	public vencepassword: Date;	
	public accesotoken: string;	
	public actualizartoken: string;	
	public empresaid: number;

	constructor(json: any = null) {

	}

}