import { Jugador } from "./jugador";
import { Pantalla } from "./pantalla";
import * as readlineSync from 'readline-sync';


export class Casino{
    private nombre:string;
    
    
    public constructor(){
        this.nombre="LA VIRULETA"
        
    }

    public getNombre():string {
        return this.nombre
    }
    public setNombre(pNombre:string):void{
        this.nombre=pNombre;
    }

    public inscripcion():void {
        let pantalla = new Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombre);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        let jugador= new Jugador(nombreAinscribirse,dinero);
        jugador.jugar(pantalla);
        pantalla.borrarConsola();
        console.log(`Gracias ${jugador.getNombre()} por apostar en ${this.nombre}`);
        console.log(`Sus fichas son ${jugador.getDinero()}`);
        console.log("Vuelva pronto");    
    }
}