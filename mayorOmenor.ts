import { Cartas } from "./cartas";
import { Jugador } from "./jugador";
import { Mazo } from "./mazo";
import  {red, blue, green,yellow} from "colors";
import * as readlineSync from 'readline-sync';
import { Pantalla } from "./pantalla";

export class MayorOmenor extends Mazo{
    private titulo:string;
    private carta1:Cartas;
    private carta2:Cartas;
    private jugador:Jugador;

    public constructor(pJugador:Jugador,pTitulo:string){
        super([],[]);
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
        this.carta2=this.darCarta();
        carta1aux=parseInt(this.carta1.getCartas().replace(/\D/g, ""));
        carta2aux=parseInt(this.carta2.getCartas().replace(/\D/g, ""));
        console.log(this.mostrarEnPantalla(this.carta2));
        if (carta2aux===undefined){
            console.log(`Usted ah perdido todo su dinero`); 
            this.jugador.setDinero(0);
            this.carta2=this.darCarta();           
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



    public juego():void {
        let pantalla = new Pantalla([]);
        let strPantalla: string[] = new Array();
        let valor:number;
        this.cargarMazo();
        this.carta1=this.darCarta();
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
            this.jugador.apostar();
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