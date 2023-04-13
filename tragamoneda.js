"use strict";
exports.__esModule = true;
exports.Tragamonedas = void 0;
var pantalla_1 = require("./pantalla");
var Tragamonedas = /** @class */ (function () {
    function Tragamonedas(pJugador, pNombre) {
        this.jugador = pJugador;
        this.nombre = pNombre;
        this.pantalla = new pantalla_1.Pantalla(new Array());
    }
    Tragamonedas.prototype.getNombreTragamonedas = function () {
        return this.nombre;
    };
    Tragamonedas.prototype.setNombreTragamoneda = function (pNombre) {
        this.nombre = pNombre;
    };
    return Tragamonedas;
}());
exports.Tragamonedas = Tragamonedas;
