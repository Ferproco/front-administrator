import { Kardex } from './Kardex.model';

export class ArticuloKardex{

  public id: number;
  public nomarticulo: string;
  public codigo: string;
  public entrada: number;
  public salida: number;
  public saldo: number;
  public costo: number;
  public costototal: number;
  public lstmovimientoskardex: Kardex[]=[];
}
