"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jugador = void 0;
//import { resolve } from "path";
const menu_1 = require("./menu");
const readlineSync = __importStar(require("readline-sync"));
//import { rejects } from "assert";
class Jugador {
    constructor(pNombre, pDinero) {
        this.nombre = pNombre;
        this.dinero = pDinero;
        this.apuesta = 0;
    }
    getNombre() {
        return this.nombre;
    }
    getDinero() {
        return this.dinero;
    }
    getApuesta() {
        return this.apuesta;
    }
    setApuesta(pApuesta) {
        this.apuesta = pApuesta;
    }
    setDinero(pDinero) {
        this.dinero = pDinero;
    }
    apostar(pPantalla) {
        do {
            /* apuestaLocal = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
         
         
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
 
                 (apuestaLocal<=0)||(apuestaLocal>this.dinero)
             }*/
        } while (pPantalla.comprobacionDatoIngresado(this.dinero, 0, 2, this) === false);
        this.dinero = this.dinero - this.apuesta;
    }
    agregarSaldo() {
        let valor;
        console.log("\n");
        if (readlineSync.keyInYN("¿Desea comprar mas fichas? ")) {
            valor = readlineSync.questionInt("Ingrese la cantidad de fichas que quiere comprar: ".toUpperCase());
            if (valor >= 0) {
                this.dinero = this.dinero + valor;
            }
            else {
                console.log(`No se puede comprar en negativo`);
            }
        }
    }
    jugar(pPantalla) {
        let valor;
        do {
            valor = pPantalla.menuPantalla();
            if ((valor > 0) && (valor < 5)) {
                let menu = new menu_1.Menu();
                menu.fabrica(valor, this);
            }
            else {
                if ((valor < 0) || (valor >= 5)) {
                    console.log("Debe ingresar opciones del menu".toUpperCase());
                    console.log("\n");
                    pPantalla.pausaConsola();
                }
            }
        } while (valor != 0);
    }
}
exports.Jugador = Jugador;
