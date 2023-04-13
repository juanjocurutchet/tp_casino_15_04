//import { resolve } from "path";
import { Menu } from "./menu";
import * as readlineSync from 'readline-sync';
import  {red, blue, green,yellow} from "colors";
import { Pantalla } from "./pantalla";
//import { rejects } from "assert";


export class Jugador {
    private nombre:String;
    private dinero:number;
    private apuesta:number;
    

    public constructor(pNombre:String, pDinero:number){
        this.nombre=pNombre;
        this.dinero=pDinero;
        this.apuesta=0;
    }

    public getNombre():String{
        return this.nombre;
    }

    public getDinero():number{
        return this.dinero;
    }

    public getApuesta():number{
        return this.apuesta;
    }

    public setDinero(pDinero:number):void{
        this.dinero=pDinero;
    }

 
    

    public apostar():void {
        let apuestaLocal:number;
        do {
    
            apuestaLocal = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
        
        
            if(apuestaLocal<=0){ 
                console.log("No se puede apostar en negativo".toUpperCase());
            } else {
                if (apuestaLocal>this.dinero){
                    console.log("Saldo insuficiente para esta apuesta".toUpperCase());
                }  
            }
        
            /*   if ((apuestaLocal>0)&&(apuestaLocal<=this.dinero)){
                this.dinero=this.dinero-apuestaLocal;
                this.apuesta=apuestaLocal;
            }   else {
                if(apuestaLocal<=0){ 
                    console.log("No se puede apostar en negativo".toUpperCase());
                } else {
                    console.log("Saldo insuficiente para esta apuesta".toUpperCase());
                }
            }*/
            
        
        } while ((apuestaLocal<=0)||(apuestaLocal>this.dinero));

        this.dinero=this.dinero-apuestaLocal;
                this.apuesta=apuestaLocal;
    }

    public agregarSaldo():void{
        let valor:number;
        
        if (readlineSync.keyInYN("¿Desea comprar mas fichas? ")){
            valor = readlineSync.questionInt("Ingrese la cantidad de fichas que quiere comprar: ".toUpperCase());
            if (valor >= 0){
                this.dinero=this.dinero+valor;
            } else {
                console.log(`No se puede comprar en negativo`);
            
            }
        } 
        
    }

    public jugar(pPantalla:Pantalla):void{
        let valor:number;
        
        do {
            valor = pPantalla.menuPantalla();
            if ((valor>0)&&(valor<5)){
                let menu = new Menu();
                menu.fabrica(valor,this);
            } else {
                if ((valor<0)||(valor>=5)) {
                    console.log("Debe ingresar opciones del menu".toUpperCase());
                    console.log("\n");
                    pPantalla.pausaConsola();
                }
            }
            
        } while(valor!=0);
    }

}