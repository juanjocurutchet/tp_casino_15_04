"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cartas = void 0;
class Cartas {
    constructor(pCartas) {
        this.cartas = pCartas;
    }
    setCartas(pCartas) {
        this.cartas = pCartas;
    }
    getCartas() {
        return this.cartas;
    }
    deQuePaloEs(pPalo) {
        return this.cartas.includes(pPalo);
    }
}
exports.Cartas = Cartas;
