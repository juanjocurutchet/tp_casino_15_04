
import { Tragamonedas } from "./tragamoneda";
import { Jugador } from "./jugador";
import * as readlineSync from 'readline-sync';
import  {red, blue, green,yellow} from "colors";
import { Frutas } from "./frutas";
import { log } from "console";

export class TragamonedasFrutas extends Tragamonedas {
    
    private guia: Frutas[];
    private tirada: number[];


    public constructor (pJugador:Jugador,pNombre:String){
        super(pJugador,pNombre);
        this.guia= new Array ();
        this.tirada= new Array();
    }
    private cargarGuia():void{
        let fruta0= new Frutas(" frutilla ");
        let fruta1= new Frutas("  banana  ");
        let fruta2= new Frutas("  manzana ");
        let fruta3= new Frutas("   pera   ");
        let fruta4= new Frutas("   mango  ");
        let fruta5= new Frutas(" arandano ");
        let fruta6= new Frutas("  cereza  ");
        let fruta7= new Frutas("    uva   ");
        let fruta8= new Frutas("   kiwi   ");
        let fruta9= new Frutas("  naranja ");
        let fruta10= new Frutas(" mandarina");
        let fruta11= new Frutas("  sandia  ");
        let fruta12= new Frutas("   melon  ");
        let fruta13= new Frutas("   caqui  ");
        let fruta14= new Frutas("   anana  ");
        this.guia.push(fruta0,fruta1,fruta2,fruta3,fruta4,fruta5,fruta6,fruta7,fruta8,fruta9,fruta10,fruta11,fruta12,fruta13,fruta14);
    }

    private setTirada():void{
        this.tirada=[];
        let aux:number[];
        aux = new Array();
        let indice : number;
        for (let i:number=0; i<3; i++){
            for (let j:number=0; j<3; j++) {
                indice = Math.floor(Math.random()*15);                  
                if (aux.includes(indice)){
                    j = j-1;
                } else {
                    aux.push(indice);
                }
            }
            this.tirada.push.apply(this.tirada,aux);
            aux=[];
        }
        
        
    }

    private mostrarEnPantalla():string[]{
        let aux:string[] = new Array;
        for (let i:number=0;i<9;i++){
            aux.push(`${this.guia[this.tirada[i]].getNombre()}`);
        }
        return aux;
    }

    private  calcularPremio():String {
        let premio:String =`Ah perdido, su dinero actual es de ${this.jugador.getDinero()}`;
        let coincidencia:number;
        let gano:boolean=false;
        let indice: number =-1;
        for (let i:number=0; i<3;i++){
            coincidencia=1;
                for (let j:number=3;j<9; j++){
                    if(this.tirada[i]===this.tirada[j]){
                        coincidencia=coincidencia+1;
                    }
                }
                if (coincidencia===3){
                    gano=true;
                    indice = i;
                }
        }
        if (gano=== true){
            for (let i:number=0; i<3; i++){
                if ((this.tirada[i]===this.tirada[i+3])&&(this.tirada[i]===this.tirada[i+6])){
                    premio=`Usted ha ganado el segundo premio con fila de ${this.guia[this.tirada[i]].getNombre()}`
                    this.jugador.setDinero(this.jugador.getDinero()+this.jugador.getApuesta()*2);
                } else {
                if (((this.tirada[4]===this.tirada[0])&&(this.tirada[4]===this.tirada[8]))||((this.tirada[4]===this.tirada[2])&&(this.tirada[4]===this.tirada[6]))){
                    premio=`Usted ha ganado el primer premio con diagonal de ${this.guia[this.tirada[4]].getNombre()}`
                    this.jugador.setDinero(this.jugador.getDinero()+this.jugador.getApuesta()*3);
                } else {
                    premio=`Usted ha ganado el tercer premio con tres iguales de ${this.guia[this.tirada[indice]].getNombre()}`
                    this.jugador.setDinero(this.jugador.getDinero()+this.jugador.getApuesta());
                    }
                }
            }  
        }  

        return premio;
    } 

    
    
    public juego():void{
        this.cargarGuia();

        do {
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            if (this.jugador.getDinero()>0){
                this.jugador.apostar();
                this.setTirada();
                this.pantalla.borrarConsola();
                this.pantalla.setPantalla(this.mostrarEnPantalla());
                this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
                console.log(this.calcularPremio());
                console.log("\n");
            } else {
                console.log("No tiene dinero suficiente para seguir jugando. Buena suerte la proxima vez"); 
                this.jugador.agregarSaldo();

            }
            this.pantalla.pausaConsola();
        } while ((this.jugador.getDinero()>=0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    
    } 


}