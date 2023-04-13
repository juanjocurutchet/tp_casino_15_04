"use strict";
exports.__esModule = true;
exports.Mazo = void 0;
var cartas_1 = require("./cartas");
var Mazo = /** @class */ (function () {
    function Mazo(pMazo, pDescarte) {
        this.mazo = pMazo;
        this.descarte = pDescarte;
    }
    Mazo.prototype.cargarMazo = function () {
        var palo;
        for (var j = 0; j < 4; j++) {
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
            for (var i = 0; i < 14; i++) {
                if (i < 13) {
                    this.mazo.push(new cartas_1.Cartas("   ".concat(i + 1, " ").concat(palo)));
                }
                else {
                    this.mazo.push(new cartas_1.Cartas("COMODIN ".concat(palo)));
                }
            }
        }
    };
    Mazo.prototype.setMazo = function (pMazo) {
        this.mazo = pMazo;
    };
    Mazo.prototype.getMazo = function () {
        return this.mazo;
    };
    Mazo.prototype.getNombreCarta = function (indice) {
        return this.mazo[indice].getCartas();
    };
    Mazo.prototype.getDescarte = function () {
        return this.descarte;
    };
    Mazo.prototype.darCarta = function () {
        var indice;
        var ultimaCarta;
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
    };
    return Mazo;
}());
exports.Mazo = Mazo;
