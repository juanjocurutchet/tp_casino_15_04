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
exports.TragamonedasCartas = void 0;
const mazo_1 = require("./mazo");
const tragamoneda_1 = require("./tragamoneda");
const readlineSync = __importStar(require("readline-sync"));
class TragamonedasCartas extends tragamoneda_1.Tragamonedas {
    constructor(pJugador, pNombre) {
        super(pJugador, pNombre);
        this.guia = new Array();
        this.tirada = new Array();
        this.mazo = new mazo_1.Mazo([], []);
    }
    cargarGuia() {
        let auxCartas;
        let auxMazo;
        this.mazo.cargarMazo();
        let palo;
        for (let j = 0; j < 4; j++) {
            switch (j) {
                case 0:
                    palo = " ♥  ";
                    break;
                case 1:
                    palo = " ♠  ";
                    break;
                case 2:
                    palo = " ♦  ";
                    break;
                case 3:
                    palo = " ♣  ";
                    break;
                default:
                    palo = "";
                    break;
            }
            auxCartas = this.mazo.getMazo().filter(e => e.deQuePaloEs(palo) === true);
            auxMazo = new mazo_1.Mazo(auxCartas, []);
            this.guia.push(auxMazo);
        }
    }
    setTirada() {
        this.tirada = [];
        let aux;
        aux = new Array();
        let indice;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 14);
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
        let auxMazo = new Array;
        let k = 0;
        for (let i = 0; i < 4; i++) {
            auxMazo = this.guia[i].getMazo();
            for (let j = 0; j < 3; j++) {
                aux.push(`${auxMazo[this.tirada[k]].getCartas()}`);
                k = k + 1;
            }
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
            for (let j = 3; j < 12; j++) {
                if (this.tirada[i] === this.tirada[j]) {
                    coincidencia = coincidencia + 1;
                }
            }
            if (coincidencia === 4) {
                gano = true;
                indice = i;
            }
        }
        if (indice != -1) {
            for (let i = 0; i < 4; i++) {
                if ((this.tirada[i] === this.tirada[i + 3]) && (this.tirada[i] === this.tirada[i + 6]) && (this.tirada[i] === this.tirada[i + 9])) {
                    premio = `Usted ha ganado el premio mayor con ${this.guia[0].getNombreCarta(this.tirada[i])}, ${this.guia[0].getNombreCarta(this.tirada[i + 14])}, ${this.guia[0].getNombreCarta(this.tirada[i + 28])}, ${this.guia[0].getNombreCarta(this.tirada[i + 42])}`;
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
                }
                else {
                    premio = `Usted ha ganado el segundo premio con ${this.guia[0].getNombreCarta(this.tirada[i])}, ${this.guia[0].getNombreCarta(this.tirada[i + 14])}, ${this.guia[0].getNombreCarta(this.tirada[i + 28])}, ${this.guia[0].getNombreCarta(this.tirada[i + 42])}`;
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
            }
        }
        return premio;
    }
    juego() {
        do {
            this.cargarGuia();
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            this.jugador.apostar(this.pantalla);
            this.setTirada();
            this.pantalla.borrarConsola();
            this.pantalla.setPantalla(this.mostrarEnPantalla());
            this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
            console.log(this.calcularPremio());
            console.log("\n");
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    }
}
exports.TragamonedasCartas = TragamonedasCartas;
