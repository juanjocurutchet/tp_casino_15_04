"use strict";
exports.__esModule = true;
exports.Pantalla = void 0;
var readlineSync = require("readline-sync");
var colors_1 = require("colors");
var Pantalla = /** @class */ (function () {
    function Pantalla(pPantalla) {
        this.pantalla = pPantalla;
    }
    Pantalla.prototype.getPantalla = function () {
        return this.pantalla;
    };
    Pantalla.prototype.setPantalla = function (pPantalla) {
        this.pantalla = pPantalla;
    };
    Pantalla.prototype.bienvenido = function (pTitulo) {
        console.log((0, colors_1.red)("BIENVENIDO A ".concat(pTitulo, "\n").toUpperCase()));
        console.log((0, colors_1.green)("Que comience el juego\n".toUpperCase()));
    };
    Pantalla.prototype.mostrarPantalla = function (pTitulo) {
        console.log("\n");
        console.log((0, colors_1.yellow)("                  ".concat(pTitulo, "\n").toUpperCase()));
        console.log("\n");
        console.log((0, colors_1.blue)("======================================================="));
        console.log("\n");
        console.log((0, colors_1.red)("                  MUCHA SUERTE EN SU TIRADA      \n"));
        console.log((0, colors_1.red)("           TRULULULULULULU TRULULULULU TRULULULU\n"));
        this.pausaConsola();
        console.log("\n");
        switch (pTitulo) {
            case "La fruta de la fortuna":
                for (var i = 0; i < 3; i++) {
                    console.log((0, colors_1.blue)("Fila ".concat(i + 1, ".....")));
                    console.log((0, colors_1.blue)("------ -----// " + (0, colors_1.green)(this.pantalla[i]) + " // " + (0, colors_1.green)(this.pantalla[i + 3]) + " // " + (0, colors_1.green)(this.pantalla[i + 6]) + " // --------"));
                }
                break;
            case "Las cartas tienen magia":
                for (var i = 0; i < 3; i++) {
                    console.log((0, colors_1.blue)("Fila ".concat(i + 1, ".....")));
                    console.log((0, colors_1.blue)("------ -----// " + (0, colors_1.green)(this.pantalla[i]) + " // " + (0, colors_1.green)(this.pantalla[i + 3]) + " // " + (0, colors_1.green)(this.pantalla[i + 6]) + " // " + (0, colors_1.green)(this.pantalla[i + 9]) + " // --------"));
                }
                break;
            case "A las cartas, Mayor o Menor":
                this.borrarConsola();
                for (var i = 0; i < this.pantalla.length; i++) {
                    console.log(this.pantalla[i]);
                }
                break;
            case "Dados, dados y mas dados":
                for (var i = 0; i < 5; i++) {
                    console.log(this.pantalla[i]);
                }
                break;
            default:
                console.log("algo fallo");
        }
        console.log((0, colors_1.blue)("\nCALCULANDO PREMIOS.....\n"));
    };
    Pantalla.prototype.menuPantalla = function () {
        console.clear();
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.red)("||                                 ||"));
        console.log((0, colors_1.red)("||   BIENVENIDO A NUESTRO CASINO   ||"));
        console.log((0, colors_1.red)("||                                 ||"));
        console.log((0, colors_1.red)("||   ESTOS  SON NUESTROS JUEGOS    ||"));
        console.log((0, colors_1.red)("||                                 ||"));
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.green)("||                                 ||"));
        console.log((0, colors_1.green)("||   1 - Tragamonedas de frutas    ||"));
        console.log((0, colors_1.green)("||   2 - Tragamonedas de cartas    ||"));
        console.log((0, colors_1.green)("||   3 - Juego de mayor o menor    ||"));
        console.log((0, colors_1.green)("||   4 - Juego de cinco dados      ||"));
        console.log((0, colors_1.green)("||                                 ||"));
        console.log((0, colors_1.blue)("====================================="));
        console.log((0, colors_1.green)("||   0 - Salir                     ||"));
        console.log((0, colors_1.blue)("=====================================\n"));
        return readlineSync.questionInt("Ingrese una opcion del menu: ".toUpperCase());
    };
    Pantalla.prototype.mensajesError = function (indice) {
        switch (indice) {
            case 1:
                console.log("Debe ingresar opciones del menu".toUpperCase());
                console.log("\n");
                this.pausaConsola();
                break;
            default:
                break;
        }
    };
    Pantalla.prototype.comprobacionDatoIngresado = function (pMax, pMin, situacion) {
        var condicion = false;
        switch (situacion) {
            case 1:
                var valor = readlineSync.questionInt("Ingrese un juego".toUpperCase());
                if ((valor < pMin) && (valor > pMin)) {
                    console.log((0, colors_1.green)("No puede ingresar ".concat((0, colors_1.red)("".concat(valor)), ", no es una opci\u00F3n del ").concat((0, colors_1.red)("menu")).toUpperCase()));
                }
                else {
                    condicion = true;
                }
                break;
            default:
                var valor1 = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
                if (valor1 < pMin) {
                    console.log((0, colors_1.green)("No puede apostar ".concat((0, colors_1.red)("".concat(valor1)), ", no se puede apostar en ").concat((0, colors_1.red)("negativo")).toUpperCase()));
                }
                else {
                    if (valor1 > pMin) {
                        console.log((0, colors_1.green)("No puede apostar ".concat((0, colors_1.red)("".concat(valor1)), ", no puede apostar mas de lo que tiene").toUpperCase()));
                    }
                    else {
                        condicion = true;
                    }
                }
                break;
        }
        return condicion;
    };
    Pantalla.prototype.borrarConsola = function () {
        console.clear();
    };
    Pantalla.prototype.pausaConsola = function () {
        readlineSync.question("Presiona " + (0, colors_1.green)("Enter") + " para continuar...");
    };
    Pantalla.prototype.juegoPantalla = function () {
    };
    return Pantalla;
}());
exports.Pantalla = Pantalla;
