import { Cartas } from "./cartas";
import { Jugador } from "./jugador";
import { Mazo } from "./mazo";
import { Tragamonedas } from "./tragamoneda";
import * as readlineSync from 'readline-sync';
import  {red, blue, green,yellow} from "colors";

export class TragamonedasCartas extends Tragamonedas {
    private guia: Mazo[];
    private tirada: number[];
    private mazo:Mazo;

    public constructor (pJugador:Jugador,pNombre:String){
        super(pJugador,pNombre);
        this.guia= new Array ();
        this.tirada= new Array();
        this.mazo = new Mazo([],[]);
    }
    private cargarGuia():void{
        let auxCartas:Cartas[];
        let auxMazo:Mazo;
        this.mazo.cargarMazo();
        let palo:string;
        for (let j:number=0;j<4;j++){
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
            auxCartas=this.mazo.getMazo().filter(e=> e.deQuePaloEs(palo) === true );
            auxMazo = new Mazo(auxCartas,[]);
            this.guia.push(auxMazo);
        }
    }

    private setTirada():void {
        this.tirada=[];
        let aux:number[];
        aux = new Array();
        let indice : number;
        for (let i:number=0; i<4; i++){
            for (let j:number=0; j<3; j++) {
                indice = Math.floor(Math.random()*14);                  
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
        let auxMazo:Cartas[] = new Array;
        let k:number=0;
        for (let i:number=0;i<4;i++){        
            auxMazo=this.guia[i].getMazo();            
            for (let j:number=0;j<3;j++){
                aux.push(`${auxMazo[this.tirada[k]].getCartas()}`);
                k=k+1;
            }
        }
        return aux;
    }

    private calcularPremio():String {
        let premio:String =`Ah perdido, su dinero actual es de ${this.jugador.getDinero()}`;
        let coincidencia:number;
        let gano:boolean=false;
        let indice: number =-1;
        for (let i:number=0;i<3;i++){
            coincidencia=1;
            for (let j:number=3;j<12; j++){
                if(this.tirada[i]===this.tirada[j]){
                    coincidencia=coincidencia+1;
                }
            }
            if (coincidencia===4){
                gano=true;
                indice = i;
            }
        }

        if (indice!=-1){
            for (let i:number=0; i<4; i++){
                if ((this.tirada[i]===this.tirada[i+3])&&(this.tirada[i]===this.tirada[i+6])&&(this.tirada[i]===this.tirada[i+9])){
                    premio=`Usted ha ganado el premio mayor con ${this.guia[0].getNombreCarta(this.tirada[i])}, ${this.guia[0].getNombreCarta(this.tirada[i+14])}, ${this.guia[0].getNombreCarta(this.tirada[i+28])}, ${this.guia[0].getNombreCarta(this.tirada[i+42])}`
                    this.jugador.setDinero(this.jugador.getDinero()+this.jugador.getApuesta()*10);
                } else {
                    premio=`Usted ha ganado el segundo premio con ${this.guia[0].getNombreCarta(this.tirada[i])}, ${this.guia[0].getNombreCarta(this.tirada[i+14])}, ${this.guia[0].getNombreCarta(this.tirada[i+28])}, ${this.guia[0].getNombreCarta(this.tirada[i+42])}`
                    this.jugador.setDinero(this.jugador.getDinero()+this.jugador.getApuesta()*2);
                }
            }  
        }


        return premio;
    }


    juego(): void {
        do {
            this.cargarGuia();
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            this.jugador.apostar();
            this.setTirada();
            this.pantalla.borrarConsola();
            this.pantalla.setPantalla(this.mostrarEnPantalla());
            this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
            console.log(this.calcularPremio());
            console.log("\n");
        } while ((this.jugador.getDinero()>0)&&(readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }

}