import { Cartas } from "./cartas";
import { Jugador } from "./jugador";
import { Mazo } from "./mazo";
import  {red, blue, green,yellow} from "colors";
import * as readlineSync from 'readline-sync';
import { Pantalla } from "./pantalla";

export class MayorOmenor{
    private titulo:string;
    private carta1:Cartas;
    private carta2:Cartas;
    private jugador:Jugador;
    private mazo:Mazo;

    public constructor(pJugador:Jugador,pTitulo:string){
        this.mazo= new Mazo([],[])
        this.titulo=pTitulo;
        this.carta1= new Cartas("Instrucciones");
        this.carta2=new Cartas("Dorso");;
        this.jugador=pJugador;
        
    }

    public getNombre():string{
        return this.titulo;
    }
    public getCarta1():Cartas{
        return this.carta1;
    }
    public getCarta2():Cartas{
        return this.carta2;
    }
    public setCarta1(pCarta1:Cartas){
        this.carta1=pCarta1;
    }
    public setCarta2(pCarta2:Cartas){
        this.carta2=pCarta2;
    }

    private mostrarEnPantalla(pCarta:Cartas):string{
        return pCarta.getCartas();
    }

  

    private calcularPremio(pMayoroMenor:number):void{
        let carta1aux:number;
        let carta2aux:number;
        this.carta2=this.mazo.darCarta();
        carta1aux=parseInt(this.carta1.getCartas().replace(/\D/g, ""));
        carta2aux=parseInt(this.carta2.getCartas().replace(/\D/g, ""));
        console.log(this.mostrarEnPantalla(this.carta2));
        if (carta2aux===undefined){
            console.log(`Usted ah perdido todo su dinero`); 
            this.jugador.setDinero(0);
            this.carta2=this.mazo.darCarta();           
        } else {
            if (pMayoroMenor===2){
                if (carta1aux>carta2aux){
                    console.log(`Felicitaciones, usted ganó`);  
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta()*2);                  
                } else {
                    console.log(`Lo lamentamos, usted ah perdido`);    
                }
            } if (pMayoroMenor===1) {
                if (carta1aux<carta2aux){
                    console.log(`Felicitaciones, usted ganó`); 
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta()*2);                   
                } else {
                    console.log(`Lo lamentamos, usted ah perdido`);    
                }
            }
        }
        this.carta1=this.carta2;
        console.log(`Su dinero actual es de ${this.jugador.getDinero()}`);
    }

    private probalidadMayor(): void {
        const carta1aux=parseInt(this.carta1.getCartas().replace(/\D/g, ""));  // Se queda con el número de la carta
        const casosPosibles = 55;                                              // número total de cartas en el mazo
        const combinacionMayor = (13-carta1aux)*4;                             // número de cartas mayores a la carta 1
        const combinacionMenor = (carta1aux-1)*4;                               // número de cartas menores a la carta 1
        const probabilidadComodin= 4/55;                                         // probabilidades de comodin
        
        console.log(`La probabilidad de sacar una carta mayor es de ${combinacionMayor/casosPosibles*100}%`);
        console.log(`La probabilidad de sacar una carta menor es de ${combinacionMenor/casosPosibles*100}%`);
        console.log(`La probabilidad de sacar un comodin es de ${probabilidadComodin*100}%`);
        
        /*cartas posibles = 55
          cartas iguales = 3
          cartas comodin = 4
          cartas mayores = (13 - numero) * 4
          cartas menores = (numero - 1) * 4
          probabilides = casos ganadoras / casos totales
          */

}



    public juego():void {
        let pantalla = new Pantalla([]);
        let strPantalla: string[] = new Array();
        let valor:number;
        this.mazo.cargarMazo();
        this.carta1=this.mazo.darCarta();
        do {
            strPantalla=[];
            console.clear();
            pantalla.bienvenido(this.titulo);            
            this.mostrarEnPantalla(this.carta1);
         //   console.log(this.jugador.getDinero());
            
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`)
            strPantalla.push(`La carta en la mesa es : ${red(this.carta1.getCartas())}`);
            strPantalla.push(`¿La siguiente carta es Mayor o Menor?`);
            strPantalla.push(`Si sale ${green("COMODIN")} pierde todo su dinero`);
            pantalla.setPantalla(strPantalla)
            pantalla.mostrarPantalla(this.titulo);
            this.jugador.apostar(pantalla);
            this.probalidadMayor();
            valor = readlineSync.questionInt(`Ingrese 1 para mayor, 2 para menor: `.toUpperCase());
            if ((valor===1)||(valor===2)){
                this.calcularPremio(valor);
            } else {
                console.log(`Ingrese 1 o 2, no puede ingresar cualquier cosa`);    
            }
            console.log("\n");
            


        } while((this.jugador.getDinero()>0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }

}