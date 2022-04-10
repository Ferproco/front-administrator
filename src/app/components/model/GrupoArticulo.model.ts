export class GrupoArticulo{
    codgrupoarticulo: string;
    nomgrupoarticulo: string;
    tipocosto: string;
    comision: number;
    tipo: string;
    codnegocio: string;
    constructor( codgrupoarticulo: string,  nomgrupoarticulo: string,tipocosto: string,comision: number,tipo: string, codnegocio: string){

        this.codgrupoarticulo=codgrupoarticulo;
        this.nomgrupoarticulo=nomgrupoarticulo;
        this.tipocosto=tipocosto;
        this.comision=comision;
        this.tipo=tipo;
        this.codnegocio=codnegocio;
    }
}