"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
const pantalla_1 = require("./pantalla");
class Tragamonedas {
    constructor(pJugador, pNombre) {
        this.jugador = pJugador;
        this.nombre = pNombre;
        this.pantalla = new pantalla_1.Pantalla(new Array());
    }
    getNombreTragamonedas() {
        return this.nombre;
    }
    setNombreTragamoneda(pNombre) {
        this.nombre = pNombre;
    }
}
exports.Tragamonedas = Tragamonedas;
