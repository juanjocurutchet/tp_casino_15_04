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
exports.MayorOmenor = void 0;
var cartas_1 = require("./cartas");
var mazo_1 = require("./mazo");
var colors_1 = require("colors");
var readlineSync = require("readline-sync");
var pantalla_1 = require("./pantalla");
var MayorOmenor = /** @class */ (function (_super) {
    __extends(MayorOmenor, _super);
    function MayorOmenor(pJugador, pTitulo) {
        var _this = _super.call(this, [], []) || this;
        _this.titulo = pTitulo;
        _this.carta1 = new cartas_1.Cartas("Instrucciones");
        _this.carta2 = new cartas_1.Cartas("Dorso");
        ;
        _this.jugador = pJugador;
        return _this;
    }
    MayorOmenor.prototype.getNombre = function () {
        return this.titulo;
    };
    MayorOmenor.prototype.getCarta1 = function () {
        return this.carta1;
    };
    MayorOmenor.prototype.getCarta2 = function () {
        return this.carta2;
    };
    MayorOmenor.prototype.setCarta1 = function (pCarta1) {
        this.carta1 = pCarta1;
    };
    MayorOmenor.prototype.setCarta2 = function (pCarta2) {
        this.carta2 = pCarta2;
    };
    MayorOmenor.prototype.mostrarEnPantalla = function (pCarta) {
        return pCarta.getCartas();
    };
    MayorOmenor.prototype.calcularPremio = function (pMayoroMenor) {
        var carta1aux;
        var carta2aux;
        this.carta2 = this.darCarta();
        carta1aux = parseInt(this.carta1.getCartas().replace(/\D/g, ""));
        carta2aux = parseInt(this.carta2.getCartas().replace(/\D/g, ""));
        console.log(this.mostrarEnPantalla(this.carta2));
        if (carta2aux === undefined) {
            console.log("Usted ah perdido todo su dinero");
            this.jugador.setDinero(0);
            this.carta2 = this.darCarta();
        }
        else {
            if (pMayoroMenor === 2) {
                if (carta1aux > carta2aux) {
                    console.log("Felicitaciones, usted gan\u00F3");
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    console.log("Lo lamentamos, usted ah perdido");
                }
            }
            if (pMayoroMenor === 1) {
                if (carta1aux < carta2aux) {
                    console.log("Felicitaciones, usted gan\u00F3");
                    this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
                }
                else {
                    console.log("Lo lamentamos, usted ah perdido");
                }
            }
        }
        this.carta1 = this.carta2;
        console.log("Su dinero actual es de ".concat(this.jugador.getDinero()));
    };
    MayorOmenor.prototype.juego = function () {
        var pantalla = new pantalla_1.Pantalla([]);
        var strPantalla = new Array();
        var valor;
        this.cargarMazo();
        this.carta1 = this.darCarta();
        do {
            strPantalla = [];
            console.clear();
            pantalla.bienvenido(this.titulo);
            this.mostrarEnPantalla(this.carta1);
            //   console.log(this.jugador.getDinero());
            strPantalla.push("Su dinero actual es de $".concat(this.jugador.getDinero(), "\n"));
            strPantalla.push("La carta en la mesa es : ".concat((0, colors_1.red)(this.carta1.getCartas())));
            strPantalla.push("\u00BFLa siguiente carta es Mayor o Menor?");
            strPantalla.push("Si sale ".concat((0, colors_1.green)("COMODIN"), " pierde todo su dinero"));
            pantalla.setPantalla(strPantalla);
            pantalla.mostrarPantalla(this.titulo);
            this.jugador.apostar();
            valor = readlineSync.questionInt("Ingrese 1 para mayor, 2 para menor: ".toUpperCase());
            if ((valor === 1) || (valor === 2)) {
                this.calcularPremio(valor);
            }
            else {
                console.log("Ingrese 1 o 2, no puede ingresar cualquier cosa");
            }
            console.log("\n");
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    };
    return MayorOmenor;
}(mazo_1.Mazo));
exports.MayorOmenor = MayorOmenor;
