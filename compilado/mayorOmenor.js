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
exports.MayorOmenor = void 0;
const cartas_1 = require("./cartas");
const mazo_1 = require("./mazo");
const colors_1 = require("colors");
const readlineSync = __importStar(require("readline-sync"));
const pantalla_1 = require("./pantalla");
class MayorOmenor {
    constructor(pJugador, pTitulo) {
        this.mazo = new mazo_1.Mazo([], []);
        this.titulo = pTitulo;
        this.carta1 = new cartas_1.Cartas("Instrucciones");
        this.carta2 = new cartas_1.Cartas("Dorso");
        ;
        this.jugador = pJugador;
    }
    getNombre() {
        return this.titulo;
    }
    getCarta1() {
        return this.carta1;
    }
    getCarta2() {
        return this.carta2;
    }
    setCarta1(pCarta1) {
        this.carta1 = pCarta1;
    }
    setCarta2(pCarta2) {
        this.carta2 = pCarta2;
    }
    mostrarEnPantalla(pCarta) {
        return pCarta.getCartas();
    }
    calcularPremio(pMayoroMenor) {
        let carta1aux;
        let carta2aux;
        this.carta2 = this.mazo.darCarta();
        carta1aux = parseInt(this.carta1.getCartas().replace(/\D/g, ""));
        carta2aux = parseInt(this.carta2.getCartas().replace(/\D/g, ""));
        console.log(this.mostrarEnPantalla(this.carta2));
        if (carta2aux === undefined) {
            console.log(`Usted ah perdido todo su dinero`);
            this.jugador.setDinero(0);
            this.carta2 = this.mazo.darCarta();
        }
        else {
            if (pMayoroMenor === 2) {
                if (carta1aux > carta2aux) {
                    console.log(`Felicitaciones, usted ganó`);
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    console.log(`Lo lamentamos, usted ah perdido`);
                }
            }
            if (pMayoroMenor === 1) {
                if (carta1aux < carta2aux) {
                    console.log(`Felicitaciones, usted ganó`);
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    console.log(`Lo lamentamos, usted ah perdido`);
                }
            }
        }
        this.carta1 = this.carta2;
        console.log(`Su dinero actual es de ${this.jugador.getDinero()}`);
    }
    probalidadMayor() {
        const carta1aux = parseInt(this.carta1.getCartas().replace(/\D/g, "")); // Se queda con el número de la carta
        const casosPosibles = 55; // número total de cartas en el mazo
        const combinacionMayor = (13 - carta1aux) * 4; // número de cartas mayores a la carta 1
        const combinacionMenor = (carta1aux - 1) * 4; // número de cartas menores a la carta 1
        const probabilidadComodin = 4 / 55; // probabilidades de comodin
        console.log(`La probabilidad de sacar una carta mayor es de ${combinacionMayor / casosPosibles * 100}%`);
        console.log(`La probabilidad de sacar una carta menor es de ${combinacionMenor / casosPosibles * 100}%`);
        console.log(`La probabilidad de sacar un comodin es de ${probabilidadComodin * 100}%`);
        /*cartas posibles = 55
          cartas iguales = 3
          cartas comodin = 4
          cartas mayores = (13 - numero) * 4
          cartas menores = (numero - 1) * 4
          probabilides = casos ganadoras / casos totales
          */
    }
    juego() {
        let pantalla = new pantalla_1.Pantalla([]);
        let strPantalla = new Array();
        let valor;
        this.mazo.cargarMazo();
        this.carta1 = this.mazo.darCarta();
        do {
            strPantalla = [];
            console.clear();
            pantalla.bienvenido(this.titulo);
            this.mostrarEnPantalla(this.carta1);
            //   console.log(this.jugador.getDinero());
            strPantalla.push(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            strPantalla.push(`La carta en la mesa es : ${(0, colors_1.red)(this.carta1.getCartas())}`);
            strPantalla.push(`¿La siguiente carta es Mayor o Menor?`);
            strPantalla.push(`Si sale ${(0, colors_1.green)("COMODIN")} pierde todo su dinero`);
            pantalla.setPantalla(strPantalla);
            pantalla.mostrarPantalla(this.titulo);
            this.jugador.apostar(pantalla);
            this.probalidadMayor();
            valor = readlineSync.questionInt(`Ingrese 1 para mayor, 2 para menor: `.toUpperCase());
            if ((valor === 1) || (valor === 2)) {
                this.calcularPremio(valor);
            }
            else {
                console.log(`Ingrese 1 o 2, no puede ingresar cualquier cosa`);
            }
            console.log("\n");
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }
}
exports.MayorOmenor = MayorOmenor;
