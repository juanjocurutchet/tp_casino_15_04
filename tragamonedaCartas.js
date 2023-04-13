"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TragamonedasCartas = void 0;
var mazo_1 = require("./mazo");
var tragamoneda_1 = require("./tragamoneda");
var readlineSync = require("readline-sync");
var TragamonedasCartas = /** @class */ (function (_super) {
    __extends(TragamonedasCartas, _super);
    function TragamonedasCartas(pJugador, pNombre) {
        var _this = _super.call(this, pJugador, pNombre) || this;
        _this.guia = new Array();
        _this.tirada = new Array();
        _this.mazo = new mazo_1.Mazo([], []);
        return _this;
    }
    TragamonedasCartas.prototype.cargarGuia = function () {
        var auxCartas;
        var auxMazo;
        this.mazo.cargarMazo();
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
            auxCartas = this.mazo.getMazo().filter(function (e) { return e.deQuePaloEs(palo) === true; });
            auxMazo = new mazo_1.Mazo(auxCartas, []);
            this.guia.push(auxMazo);
        }
    };
    TragamonedasCartas.prototype.setTirada = function () {
        this.tirada = [];
        var aux;
        aux = new Array();
        var indice;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 14);
                if (aux.includes(indice)) {
                    j = j - 1;
                }
                else {
                    aux.push(indice);
                }
            }
            this.tirada.push.apply(this.tirada, aux);
            aux = [];
        }
    };
    TragamonedasCartas.prototype.mostrarEnPantalla = function () {
        var aux = new Array;
        var auxMazo = new Array;
        var k = 0;
        for (var i = 0; i < 4; i++) {
            auxMazo = this.guia[i].getMazo();
            for (var j = 0; j < 3; j++) {
                aux.push("".concat(auxMazo[this.tirada[k]].getCartas()));
                k = k + 1;
            }
        }
        return aux;
    };
    TragamonedasCartas.prototype.calcularPremio = function () {
        var premio = "Ah perdido, su dinero actual es de ".concat(this.jugador.getDinero());
        var coincidencia;
        var gano = false;
        var indice = -1;
        for (var i = 0; i < 3; i++) {
            coincidencia = 1;
            for (var j = 3; j < 12; j++) {
                if (this.tirada[i] === this.tirada[j]) {
                    coincidencia = coincidencia + 1;
                }
            }
            if (coincidencia === 4) {
                gano = true;
                indice = i;
            }
        }
        if (indice != -1) {
            for (var i = 0; i < 4; i++) {
                if ((this.tirada[i] === this.tirada[i + 3]) && (this.tirada[i] === this.tirada[i + 6]) && (this.tirada[i] === this.tirada[i + 9])) {
                    premio = "Usted ha ganado el premio mayor con ".concat(this.guia[0].getNombreCarta(this.tirada[i]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 14]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 28]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 42]));
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
                }
                else {
                    premio = "Usted ha ganado el segundo premio con ".concat(this.guia[0].getNombreCarta(this.tirada[i]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 14]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 28]), ", ").concat(this.guia[0].getNombreCarta(this.tirada[i + 42]));
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
            }
        }
        return premio;
    };
    TragamonedasCartas.prototype.juego = function () {
        do {
            this.cargarGuia();
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log("Su dinero actual es de $".concat(this.jugador.getDinero(), "\n"));
            this.jugador.apostar();
            this.setTirada();
            this.pantalla.borrarConsola();
            this.pantalla.setPantalla(this.mostrarEnPantalla());
            this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
            console.log(this.calcularPremio());
            console.log("\n");
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    };
    return TragamonedasCartas;
}(tragamoneda_1.Tragamonedas));
exports.TragamonedasCartas = TragamonedasCartas;
