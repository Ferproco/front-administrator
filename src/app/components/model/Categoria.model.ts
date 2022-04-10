export class Categoria {

    public codfamilia: number;
    public nomfamilia: string;
    public codnegocio: number;
    public imagen: string;
    public status: string = 'Activo';

    constructor(json: any = null) {
        if (json !== null) {
            this.codfamilia = json.codfamilia;
            this.nomfamilia = json.nomfamilia;
            this.codnegocio = json.codnegocio;
            this.imagen = json.imagen;
            this.status = json.status;
        }

    }
}