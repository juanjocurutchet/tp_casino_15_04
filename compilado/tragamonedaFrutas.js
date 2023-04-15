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
exports.TragamonedasFrutas = void 0;
const tragamoneda_1 = require("./tragamoneda");
const readlineSync = __importStar(require("readline-sync"));
const frutas_1 = require("./frutas");
class TragamonedasFrutas extends tragamoneda_1.Tragamonedas {
    constructor(pJugador, pNombre) {
        super(pJugador, pNombre);
        this.guia = new Array();
        this.tirada = new Array();
    }
    cargarGuia() {
        let fruta0 = new frutas_1.Frutas(" frutilla ");
        let fruta1 = new frutas_1.Frutas("  banana  ");
        let fruta2 = new frutas_1.Frutas("  manzana ");
        let fruta3 = new frutas_1.Frutas("   pera   ");
        let fruta4 = new frutas_1.Frutas("   mango  ");
        let fruta5 = new frutas_1.Frutas(" arandano ");
        let fruta6 = new frutas_1.Frutas("  cereza  ");
        let fruta7 = new frutas_1.Frutas("    uva   ");
        let fruta8 = new frutas_1.Frutas("   kiwi   ");
        let fruta9 = new frutas_1.Frutas("  naranja ");
        let fruta10 = new frutas_1.Frutas(" mandarina");
        let fruta11 = new frutas_1.Frutas("  sandia  ");
        let fruta12 = new frutas_1.Frutas("   melon  ");
        let fruta13 = new frutas_1.Frutas("   caqui  ");
        let fruta14 = new frutas_1.Frutas("   anana  ");
        this.guia.push(fruta0, fruta1, fruta2, fruta3, fruta4, fruta5, fruta6, fruta7, fruta8, fruta9, fruta10, fruta11, fruta12, fruta13, fruta14);
    }
    setTirada() {
        this.tirada = [];
        let aux;
        aux = new Array();
        let indice;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 15);
                if (aux.includes(indice)) {
                    j = j - 1;
                }
                else {
                    aux.push(indice);
                }
            }
            this.tirada.push.apply(this.tirada, aux);
            aux = [];
        }
    }
    mostrarEnPantalla() {
        let aux = new Array;
        for (let i = 0; i < 9; i++) {
            aux.push(`${this.guia[this.tirada[i]].getNombre()}`);
        }
        return aux;
    }
    calcularPremio() {
        let premio = `Ah perdido, su dinero actual es de ${this.jugador.getDinero()}`;
        let coincidencia;
        let gano = false;
        let indice = -1;
        for (let i = 0; i < 3; i++) {
            coincidencia = 1;
            for (let j = 3; j < 9; j++) {
                if (this.tirada[i] === this.tirada[j]) {
                    coincidencia = coincidencia + 1;
                }
            }
            if (coincidencia === 3) {
                gano = true;
                indice = i;
            }
        }
        if (gano === true) {
            for (let i = 0; i < 3; i++) {
                if ((this.tirada[i] === this.tirada[i + 3]) && (this.tirada[i] === this.tirada[i + 6])) {
                    premio = `Usted ha ganado el segundo premio con fila de ${this.guia[this.tirada[i]].getNombre()}`;
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    if (((this.tirada[4] === this.tirada[0]) && (this.tirada[4] === this.tirada[8])) || ((this.tirada[4] === this.tirada[2]) && (this.tirada[4] === this.tirada[6]))) {
                        premio = `Usted ha ganado el primer premio con diagonal de ${this.guia[this.tirada[4]].getNombre()}`;
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 3);
                    }
                    else {
                        premio = `Usted ha ganado el tercer premio con tres iguales de ${this.guia[this.tirada[indice]].getNombre()}`;
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta());
                    }
                }
            }
        }
        return premio;
    }
    juego() {
        this.cargarGuia();
        do {
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            if (this.jugador.getDinero() > 0) {
                this.jugador.apostar(this.pantalla);
                this.setTirada();
                this.pantalla.borrarConsola();
                this.pantalla.setPantalla(this.mostrarEnPantalla());
                this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
                console.log(this.calcularPremio());
                console.log("\n");
            }
            else {
                console.log("No tiene dinero suficiente para seguir jugando. Buena suerte la proxima vez");
                this.jugador.agregarSaldo();
            }
            this.pantalla.pausaConsola();
        } while ((this.jugador.getDinero() >= 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }
}
exports.TragamonedasFrutas = TragamonedasFrutas;
