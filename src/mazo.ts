import { Cartas } from "./cartas";

export class Mazo {
   protected mazo : Cartas[]
   protected descarte : number[]

   public constructor(pMazo:Cartas[],pDescarte:number[]){
        this.mazo = pMazo;
        this.descarte = pDescarte;
   }

   public cargarMazo():void{
     let palo:string;
     for (let j:number=0; j<4; j++) {
          switch (j){
               case 0:
                    palo=" ♥  ";
                    break;
               case 1:
                    palo=" ♠  ";
                    break;
               case 2:
                    palo=" ♦  "
                    break;
               case 3: 
                    palo=" ♣  "
                    break;
               default :
                    palo=""
                    break;
          }
          for (let i:number=0; i<14;i++){
               if (i<13){
                    this.mazo.push(new Cartas(`   ${i+1} ${palo}`));
               } else {
                    this.mazo.push(new Cartas(`COMODIN ${palo}`));
               }   
          }
     }
   }

   public setMazo(pMazo:Cartas[]):void{
        this.mazo = pMazo;
   }
   public getMazo():Cartas[]{
    return this.mazo
   }
   public getNombreCarta(indice:number):string{
         return this.mazo[indice].getCartas();
   }
   
   public getDescarte():number[]{
    return this.descarte
   }
   public darCarta():Cartas{
          let indice:number;
          let ultimaCarta:number;
          if (this.descarte.length>45){
               ultimaCarta=this.descarte[this.descarte.length-1]
               this.descarte=[];
               this.descarte.push(ultimaCarta);
          } 
          do {
               indice = Math.floor(Math.random()*56);               
          } while (this.descarte.includes(indice)===true);
          this.descarte.push(indice);

          return this.mazo[indice];
   }
   
}