"use strict";
exports.__esModule = true;
exports.Cartas = void 0;
var Cartas = /** @class */ (function () {
    function Cartas(pCartas) {
        this.cartas = pCartas;
    }
    Cartas.prototype.setCartas = function (pCartas) {
        this.cartas = pCartas;
    };
    Cartas.prototype.getCartas = function () {
        return this.cartas;
    };
    Cartas.prototype.deQuePaloEs = function (pPalo) {
        return this.cartas.includes(pPalo);
    };
    return Cartas;
}());
exports.Cartas = Cartas;
