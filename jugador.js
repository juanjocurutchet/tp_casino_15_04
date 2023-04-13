"use strict";
exports.__esModule = true;
exports.Jugador = void 0;
//import { resolve } from "path";
var menu_1 = require("./menu");
var readlineSync = require("readline-sync");
//import { rejects } from "assert";
var Jugador = /** @class */ (function () {
    function Jugador(pNombre, pDinero) {
        this.nombre = pNombre;
        this.dinero = pDinero;
        this.apuesta = 0;
    }
    Jugador.prototype.getNombre = function () {
        return this.nombre;
    };
    Jugador.prototype.getDinero = function () {
        return this.dinero;
    };
    Jugador.prototype.getApuesta = function () {
        return this.apuesta;
    };
    Jugador.prototype.setDinero = function (pDinero) {
        this.dinero = pDinero;
    };
    Jugador.prototype.apostar = function () {
        var apuestaLocal;
        do {
            apuestaLocal = readlineSync.questionInt("Ingrese su apuesta: ".toUpperCase());
            if (apuestaLocal <= 0) {
                console.log("No se puede apostar en negativo".toUpperCase());
            }
            else {
                if (apuestaLocal > this.dinero) {
                    console.log("Saldo insuficiente para esta apuesta".toUpperCase());
                }
            }
            /*   if ((apuestaLocal>0)&&(apuestaLocal<=this.dinero)){
                this.dinero=this.dinero-apuestaLocal;
                this.apuesta=apuestaLocal;
            }   else {
                if(apuestaLocal<=0){
                    console.log("No se puede apostar en negativo".toUpperCase());
                } else {
                    console.log("Saldo insuficiente para esta apuesta".toUpperCase());
                }
            }*/
        } while ((apuestaLocal <= 0) || (apuestaLocal > this.dinero));
        this.dinero = this.dinero - apuestaLocal;
        this.apuesta = apuestaLocal;
    };
    Jugador.prototype.agregarSaldo = function () {
        var valor;
        if (readlineSync.keyInYN("¿Desea comprar mas fichas? ")) {
            valor = readlineSync.questionInt("Ingrese la cantidad de fichas que quiere comprar: ".toUpperCase());
            if (valor >= 0) {
                this.dinero = this.dinero + valor;
            }
            else {
                console.log("No se puede comprar en negativo");
            }
        }
    };
    Jugador.prototype.jugar = function (pPantalla) {
        var valor;
        do {
            valor = pPantalla.menuPantalla();
            if ((valor > 0) && (valor < 5)) {
                var menu = new menu_1.Menu();
                menu.fabrica(valor, this);
            }
            else {
                if ((valor < 0) || (valor >= 5)) {
                    console.log("Debe ingresar opciones del menu".toUpperCase());
                    console.log("\n");
                    pPantalla.pausaConsola();
                }
            }
        } while (valor != 0);
    };
    return Jugador;
}());
exports.Jugador = Jugador;
