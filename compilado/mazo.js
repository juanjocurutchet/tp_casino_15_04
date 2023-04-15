"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mazo = void 0;
const cartas_1 = require("./cartas");
class Mazo {
    constructor(pMazo, pDescarte) {
        this.mazo = pMazo;
        this.descarte = pDescarte;
    }
    cargarMazo() {
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
            for (let i = 0; i < 14; i++) {
                if (i < 13) {
                    this.mazo.push(new cartas_1.Cartas(`   ${i + 1} ${palo}`));
                }
                else {
                    this.mazo.push(new cartas_1.Cartas(`COMODIN ${palo}`));
                }
            }
        }
    }
    setMazo(pMazo) {
        this.mazo = pMazo;
    }
    getMazo() {
        return this.mazo;
    }
    getNombreCarta(indice) {
        return this.mazo[indice].getCartas();
    }
    getDescarte() {
        return this.descarte;
    }
    darCarta() {
        let indice;
        let ultimaCarta;
        if (this.descarte.length > 45) {
            ultimaCarta = this.descarte[this.descarte.length - 1];
            this.descarte = [];
            this.descarte.push(ultimaCarta);
        }
        do {
            indice = Math.floor(Math.random() * 56);
        } while (this.descarte.includes(indice) === true);
        this.descarte.push(indice);
        return this.mazo[indice];
    }
}
exports.Mazo = Mazo;
