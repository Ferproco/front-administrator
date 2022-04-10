export class Cliente {
    codcliente: string;
    codgrupo: string;
    codvendedor: string;
    cedula: string;
    rif: string;
    telefonofijo1: string;
    telefonofijo2: string;
    telefonomovil: string;
    telefonofax: string;
    direccionfiscal: string;
    correoe: string;
    paginaweb: string;
    tipopersona: string;
    plazocredito: number;
    montocredito: number;
    tipocredito: string;
    unidadplazocredito: string;
    status: string;
    nombre: string;
    regimeniva: string;
    razonsocial: string;
    fecharegistro: string;
    tarifa: string;
    codnegocio: string;
    contribuyente: string;
    codcontable: string;
    codigoruta: string;


    constructor(cod: string, codgr: string, codven: string, cedu: string, rif: string, telef1: string, telef2: string, telefmov: string, teleffax: string, dir: string,corr:string,pagweb:string,tipoper:string ,plazocre:number,montocre:number,tipocred:string,unidplazocred:string,statu:string,nombr:string,regimiva:string,razonsoc:string,fecharegis:string,tarifa:string,codnegocio:string,contri:string,codcontable:string,codruta:string) {


        this.codcliente= cod;
        this.codgrupo= codgr;
        this.codvendedor=codven;
        this.cedula=cedu;
        this.rif=rif;
        this.telefonofijo1=telef1;
        this.telefonofijo2= telef2;
        this.telefonomovil=telefmov;
        this.telefonofax=teleffax;
        this.direccionfiscal=dir;
        this.correoe=corr;
        this.paginaweb=pagweb;
        this.tipopersona=tipoper;
        this.plazocredito=plazocre;
        this.montocredito=montocre;
        this.tipocredito=tipocred;
        this.unidadplazocredito= unidplazocred;
        this.status=statu;
        this.nombre=nombr;
        this.regimeniva=regimiva;
        this.razonsocial= razonsoc;
        this.fecharegistro=fecharegis
        this.tarifa=tarifa;
        this.codnegocio=codnegocio;
        this.contribuyente= contri;
        this.codcontable=codcontable;
        this.codigoruta=codruta;
    

    }

}