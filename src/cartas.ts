export class Cartas {
    private cartas : string;
        
    public constructor (pCartas:string){
      this.cartas = pCartas;
    }
    
    public setCartas(pCartas:string):void{
            this.cartas = pCartas
    }
    public getCartas():string{
            return this.cartas
    }

    public deQuePaloEs(pPalo:string):Boolean{
        return this.cartas.includes(pPalo)
    }
}