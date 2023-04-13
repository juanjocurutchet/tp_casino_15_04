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
exports.TragamonedasFrutas = void 0;
var tragamoneda_1 = require("./tragamoneda");
var readlineSync = require("readline-sync");
var frutas_1 = require("./frutas");
var TragamonedasFrutas = /** @class */ (function (_super) {
    __extends(TragamonedasFrutas, _super);
    function TragamonedasFrutas(pJugador, pNombre) {
        var _this = _super.call(this, pJugador, pNombre) || this;
        _this.guia = new Array();
        _this.tirada = new Array();
        return _this;
    }
    TragamonedasFrutas.prototype.cargarGuia = function () {
        var fruta0 = new frutas_1.Frutas(" frutilla ");
        var fruta1 = new frutas_1.Frutas("  banana  ");
        var fruta2 = new frutas_1.Frutas("  manzana ");
        var fruta3 = new frutas_1.Frutas("   pera   ");
        var fruta4 = new frutas_1.Frutas("   mango  ");
        var fruta5 = new frutas_1.Frutas(" arandano ");
        var fruta6 = new frutas_1.Frutas("  cereza  ");
        var fruta7 = new frutas_1.Frutas("    uva   ");
        var fruta8 = new frutas_1.Frutas("   kiwi   ");
        var fruta9 = new frutas_1.Frutas("  naranja ");
        var fruta10 = new frutas_1.Frutas(" mandarina");
        var fruta11 = new frutas_1.Frutas("  sandia  ");
        var fruta12 = new frutas_1.Frutas("   melon  ");
        var fruta13 = new frutas_1.Frutas("   caqui  ");
        var fruta14 = new frutas_1.Frutas("   anana  ");
        this.guia.push(fruta0, fruta1, fruta2, fruta3, fruta4, fruta5, fruta6, fruta7, fruta8, fruta9, fruta10, fruta11, fruta12, fruta13, fruta14);
    };
    TragamonedasFrutas.prototype.setTirada = function () {
        this.tirada = [];
        var aux;
        aux = new Array();
        var indice;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                indice = Math.floor(Math.random() * 15);
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
    TragamonedasFrutas.prototype.mostrarEnPantalla = function () {
        var aux = new Array;
        for (var i = 0; i < 9; i++) {
            aux.push("".concat(this.guia[this.tirada[i]].getNombre()));
        }
        return aux;
    };
    TragamonedasFrutas.prototype.calcularPremio = function () {
        var premio = "Ah perdido, su dinero actual es de ".concat(this.jugador.getDinero());
        var coincidencia;
        var gano = false;
        var indice = -1;
        for (var i = 0; i < 3; i++) {
            coincidencia = 1;
            for (var j = 3; j < 9; j++) {
                if (this.tirada[i] === this.tirada[j]) {
                    coincidencia = coincidencia + 1;
                }
            }
            if (coincidencia === 3) {
                gano = true;
                indice = i;
            }
        }
        if (gano === true) {
            for (var i = 0; i < 3; i++) {
                if ((this.tirada[i] === this.tirada[i + 3]) && (this.tirada[i] === this.tirada[i + 6])) {
                    premio = "Usted ha ganado el segundo premio con fila de ".concat(this.guia[this.tirada[i]].getNombre());
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    if (((this.tirada[4] === this.tirada[0]) && (this.tirada[4] === this.tirada[8])) || ((this.tirada[4] === this.tirada[2]) && (this.tirada[4] === this.tirada[6]))) {
                        premio = "Usted ha ganado el primer premio con diagonal de ".concat(this.guia[this.tirada[4]].getNombre());
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 3);
                    }
                    else {
                        premio = "Usted ha ganado el tercer premio con tres iguales de ".concat(this.guia[this.tirada[indice]].getNombre());
                        this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta());
                    }
                }
            }
        }
        return premio;
    };
    TragamonedasFrutas.prototype.juego = function () {
        this.cargarGuia();
        do {
            this.pantalla.borrarConsola();
            this.pantalla.bienvenido(this.getNombreTragamonedas());
            console.log("Su dinero actual es de $".concat(this.jugador.getDinero(), "\n"));
            if (this.jugador.getDinero() > 0) {
                this.jugador.apostar();
                this.setTirada();
                this.pantalla.borrarConsola();
                this.pantalla.setPantalla(this.mostrarEnPantalla());
                this.pantalla.mostrarPantalla(this.getNombreTragamonedas());
                console.log(this.calcularPremio());
                console.log("\n");
            }
            else {
                console.log("No tiene dinero suficiente para seguir jugando. Buena suerte la proxima vez");
                this.jugador.agregarSaldo();
            }
            this.pantalla.pausaConsola();
        } while ((this.jugador.getDinero() >= 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    };
    return TragamonedasFrutas;
}(tragamoneda_1.Tragamonedas));
exports.TragamonedasFrutas = TragamonedasFrutas;
