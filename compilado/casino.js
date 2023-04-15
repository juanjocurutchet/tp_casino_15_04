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
exports.Casino = void 0;
const jugador_1 = require("./jugador");
const pantalla_1 = require("./pantalla");
const readlineSync = __importStar(require("readline-sync"));
class Casino {
    constructor() {
        this.nombre = "LA VIRULETA";
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(pNombre) {
        this.nombre = pNombre;
    }
    inscripcion() {
        let pantalla = new pantalla_1.Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombre);
        pantalla.pausaConsola();
        const nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        const dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        let jugador = new jugador_1.Jugador(nombreAinscribirse, dinero);
        jugador.jugar(pantalla);
        pantalla.borrarConsola();
        console.log(`Gracias ${jugador.getNombre()} por apostar en ${this.nombre}`);
        console.log(`Sus fichas son ${jugador.getDinero()}`);
        console.log("Vuelva pronto");
    }
}
exports.Casino = Casino;
