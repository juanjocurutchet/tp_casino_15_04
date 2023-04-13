"use strict";
exports.__esModule = true;
exports.Dados = void 0;
var readlineSync = require("readline-sync");
var colors_1 = require("colors");
var pantalla_1 = require("./pantalla");
var Dados = /** @class */ (function () {
    function Dados(jugador, nombre) {
        this.dados = [];
        this.nombre = nombre;
        this.jugador = jugador;
    }
    Dados.prototype.getdados = function () {
        return this.dados;
    };
    Dados.prototype.setDados = function (pdados) {
        this.dados = pdados;
    };
    Dados.prototype.getNombreDados = function () {
        return this.nombre;
    };
    Dados.prototype.setNombreDados = function (nombre) {
        this.nombre = nombre;
    };
    Dados.prototype.premioObtenido = function () {
        var premio = "Ah perdido, su dinero actual es de ".concat(this.jugador.getDinero());
        if (this.verificarGenerala()) {
            premio = "\u00A1Felicidades, obtuviste Generala! Ganaste el premio Mayor; $ ".concat(this.jugador.getApuesta() * 10, ".");
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
        }
        else if (this.verificarEscalera()) {
            premio = "\u00A1Felicidades, Obtuviste escalera! Ganaste el cuarto premio, $ ".concat(this.jugador.getApuesta() * 2);
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
        }
        else if (this.verificarPoker()) {
            premio = "\u00A1Felicidades, obtuviste Poker! Ganaste el tercer premio, $ ".concat(this.jugador.getApuesta() * 4);
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 4);
        }
        else if (this.verificarFull()) {
            premio = "\u00A1Obtuviste Full! Ganaste el segundo premio, $ ".concat(this.jugador.getApuesta() * 8);
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 8);
        }
        else {
            premio = "Lo siento, no obtuviste ninguna combinaci\u00F3n ganadora, su dinero actual es de ".concat(this.jugador.getDinero());
        }
        return premio;
    };
    Dados.prototype.jugar = function () {
        var pantalla = new pantalla_1.Pantalla([]);
        var strDados = new Array();
        do {
            console.clear();
            pantalla.bienvenido(this.nombre);
            console.log("Su dinero actual es de $".concat(this.jugador.getDinero(), "\n"));
            this.jugador.apostar();
            console.log(this.probPremioMayor());
            this.tirarDados();
            strDados = [];
            for (var i = 0; i < 5; i++) {
                strDados.push("Dado ".concat(i + 1, ": ").concat(this.dados[i]));
            }
            pantalla.setPantalla(strDados);
            pantalla.mostrarPantalla(this.nombre);
            pantalla.pausaConsola();
            this.verificarGenerala();
            this.verificarEscalera();
            this.verificarPoker();
            this.verificarFull();
            //                  console.log(strDados);
            console.log(this.premioObtenido());
            console.log("\n");
        } while ((this.jugador.getDinero() > 0) && (readlineSync.keyInYN("¿Desea jugar de nuevo? ")));
    };
    Dados.prototype.probPremioMayor = function () {
        var lados = 6; // número de lados en cada dado
        var combinacionesPosibles = Math.pow(lados, 5); // número total de combinaciones posibles
        var combinacionesCincoIguales = lados; // solo hay una combinación posible para obtener cinco dados iguales
        var probabilidad = combinacionesCincoIguales / combinacionesPosibles; // calcular la probabilidad
        return (0, colors_1.blue)("Su probabilidad de obtener el premio mayor es de ".concat((0, colors_1.red)("".concat(probabilidad))));
    };
    // Cargamos el arreglo dados con cinco numeros aleatorios...
    Dados.prototype.tirarDados = function () {
        this.dados = [];
        for (var i = 0; i < 5; i++) {
            this.dados.push(Math.floor(Math.random() * 6) + 1);
        }
    };
    /* Obtenemos el primer elemento del arreglo para compararlo con el resto.Iteramos a través
    del resto de los elementos en el arreglo, si encontramos un elemento que no es igual al
    primer elemento, devolvemos falso. Si llegamos al final del bucle sin encontrar ningún
    elemento diferente, devolvemos verdadero... */
    Dados.prototype.verificarGenerala = function () {
        var primerElemento = this.dados[0];
        for (var i = 1; i < this.dados.length; i++) {
            if (this.dados[i] !== primerElemento) {
                return false;
            }
        }
        return true;
    };
    /* Utilizamos un bucle for para iterar sobre cada elemento del array.
    luego utilizamos otro bucle for anidado para contar el número de ocurrencias
    en el array. Si elememento aparece cuatro veces en el array, retorna true.Si
    el bucle exterior se completa sin encontrar cuatro números iguales, retorna false.*/
    Dados.prototype.verificarPoker = function () {
        for (var i = 0; i < this.dados.length; i++) {
            var elemActual = this.dados[i];
            var count = 0;
            for (var j = 0; j < this.dados.length; j++) {
                if (this.dados[j] === elemActual) {
                    count++;
                }
                if (count === 4) {
                    return true;
                }
            }
        }
        return false;
    };
    /*Primero ordenamos el arreglo de menor a mayor con sort. Luego, iteramos a través de cada
    elemento del arreglo y verificamos si es igual al elemento anterior más 1. Si encontramos
    un elemento que no es consecutivo, devolvemos false. Si llegamos al final del bucle sin
    encontrar ningún elemento que no sea consecutivo, devolvemos true. */
    Dados.prototype.verificarEscalera = function () {
        this.dados.sort(function (a, b) { return a - b; });
        for (var i = 1; i < this.dados.length; i++) {
            if (this.dados[i] !== this.dados[i - 1] + 1) {
                return false;
            }
        }
        return true;
    };
    /* Tomamos los valores de los dados y creamos un nuevo arreglo que contiene solo los valores
    únicos almacenados en dados utilizando Set. Luego, verificamos si numerosUnicos contiene dos
    valores únicos; si no es así, no puede haber un Full, por lo que la función devuelve false.
    Si hay exactamente dos valores únicos en numerosUnicos, contamos cuántas veces aparece uno de
    ellos en dados utilizando el método filter. Si ese valor aparece exactamente dos o tres veces,
    retornamostrue, de lo contrario, retornamos false. */
    Dados.prototype.verificarFull = function () {
        var numerosUnicos = this.dados.reduce(function (acumulador, valor) {
            if (!acumulador.includes(valor)) {
                acumulador.push(valor);
            }
            return acumulador;
        }, []);
        if (numerosUnicos.length === 2) {
            var numRepetidos = this.dados.filter(function (num) { return num === numerosUnicos[0]; }).length;
            return numRepetidos === 2 || numRepetidos === 3;
        }
        return false;
    };
    return Dados;
}());
exports.Dados = Dados;
