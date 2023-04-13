"use strict";
exports.__esModule = true;
exports.Menu = void 0;
var dados_1 = require("./dados");
var mayorOmenor_1 = require("./mayorOmenor");
var tragamonedaCartas_1 = require("./tragamonedaCartas");
var tragamonedaFrutas_1 = require("./tragamonedaFrutas");
var Menu = /** @class */ (function () {
    function Menu() {
    }
    Menu.prototype.fabrica = function (pIndice, pJugador) {
        var juego;
        switch (pIndice) {
            case 1:
                juego = new tragamonedaFrutas_1.TragamonedasFrutas(pJugador, "La fruta de la fortuna");
                juego.juego();
                break;
            case 2:
                juego = new tragamonedaCartas_1.TragamonedasCartas(pJugador, "Las cartas tienen magia");
                juego.juego();
                break;
            case 3:
                console.log("A las cartas, Mayor o Menor");
                juego = new mayorOmenor_1.MayorOmenor(pJugador, "A las cartas, Mayor o Menor");
                juego.juego();
                break;
            case 4:
                juego = new dados_1.Dados(pJugador, "Dados, dados y mas dados");
                juego.jugar();
                break;
            case 0:
                console.log("Gracias por sumarte al cacino");
                break;
            default:
                console.log("No pertence a este cacino");
        }
    };
    return Menu;
}());
exports.Menu = Menu;
