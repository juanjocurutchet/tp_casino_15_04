"use strict";
exports.__esModule = true;
exports.Casino = void 0;
var jugador_1 = require("./jugador");
var pantalla_1 = require("./pantalla");
var readlineSync = require("readline-sync");
var Casino = /** @class */ (function () {
    function Casino() {
        this.nombre = "LA VIRULETA";
    }
    Casino.prototype.getNombre = function () {
        return this.nombre;
    };
    Casino.prototype.setNombre = function (pNombre) {
        this.nombre = pNombre;
    };
    Casino.prototype.inscripcion = function () {
        var pantalla = new pantalla_1.Pantalla([]);
        pantalla.borrarConsola();
        pantalla.bienvenido(this.nombre);
        pantalla.pausaConsola();
        var nombreAinscribirse = readlineSync.question("Ingrese su nombre: ".toUpperCase());
        var dinero = readlineSync.questionInt("Ingrese la cantidad de fichas a comprar: ".toUpperCase());
        var jugador = new jugador_1.Jugador(nombreAinscribirse, dinero);
        jugador.jugar(pantalla);
        pantalla.borrarConsola();
        console.log("Gracias ".concat(jugador.getNombre(), " por apostar en ").concat(this.nombre));
        console.log("Sus fichas son ".concat(jugador.getDinero()));
        console.log("Vuelva pronto");
    };
    return Casino;
}());
exports.Casino = Casino;
