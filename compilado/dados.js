"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dados = void 0;
const readlineSync = __importStar(require("readline-sync"));
const colors_1 = require("colors");
const pantalla_1 = require("./pantalla");
class Dados {
    constructor(jugador, nombre) {
        this.dados = [];
        this.nombre = nombre;
        this.jugador = jugador;
    }
    getdados() {
        return this.dados;
    }
    setDados(pdados) {
        this.dados = pdados;
    }
    getNombreDados() {
        return this.nombre;
    }
    setNombreDados(nombre) {
        this.nombre = nombre;
    }
    premioObtenido() {
        let premio = `Ah perdido, su dinero actual es de ${this.jugador.getDinero()}`;
        if (this.verificarGenerala()) {
            premio = `¡Felicidades, obtuviste Generala! Ganaste el premio Mayor; $ ${this.jugador.getApuesta() * 10}.`;
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 10);
        }
        else if (this.verificarEscalera()) {
            premio = `¡Felicidades, Obtuviste escalera! Ganaste el cuarto premio, $ ${this.jugador.getApuesta() * 2}`;
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 2);
        }
        else if (this.verificarPoker()) {
            premio = `¡Felicidades, obtuviste Poker! Ganaste el tercer premio, $ ${this.jugador.getApuesta() * 4}`;
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 4);
        }
        else if (this.verificarFull()) {
            premio = `¡Obtuviste Full! Ganaste el segundo premio, $ ${this.jugador.getApuesta() * 8}`;
            this.jugador.setDinero(this.jugador.getDinero() + this.jugador.getApuesta() * 8);
        }
        else {
            premio = `Lo siento, no obtuviste ninguna combinación ganadora, su dinero actual es de ${this.jugador.getDinero()}`;
        }
        return premio;
    }
    jugar() {
        let pantalla = new pantalla_1.Pantalla([]);
        let strDados = new Array();
        do {
            console.clear();
            pantalla.bienvenido(this.nombre);
            console.log(`Su dinero actual es de $${this.jugador.getDinero()}\n`);
            this.jugador.apostar(pantalla);
            console.log(this.probPremioMayor());
            this.tirarDados();
            strDados = [];
            for (let i = 0; i < 5; i++) {
                strDados.push(`Dado ${i + 1}: ${this.dados[i]}`);
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
    }
    probPremioMayor() {
        const lados = 6; // número de lados en cada dado
        const combinacionesPosibles = Math.pow(lados, 5); // número total de combinaciones posibles
        const combinacionesCincoIguales = lados; // solo hay una combinación posible para obtener cinco dados iguales
        const probabilidad = (combinacionesCincoIguales / combinacionesPosibles) * 100; // calcular la probabilidad
        return (0, colors_1.blue)(`Su probabilidad de obtener el premio mayor es de ${(0, colors_1.red)(`${probabilidad}`)}`);
    }
    // Cargamos el arreglo dados con cinco numeros aleatorios...
    tirarDados() {
        this.dados = [];
        for (let i = 0; i < 5; i++) {
            this.dados.push(Math.floor(Math.random() * 6) + 1);
        }
    }
    /* Obtenemos el primer elemento del arreglo para compararlo con el resto.Iteramos a través
    del resto de los elementos en el arreglo, si encontramos un elemento que no es igual al
    primer elemento, devolvemos falso. Si llegamos al final del bucle sin encontrar ningún
    elemento diferente, devolvemos verdadero... */
    verificarGenerala() {
        const primerElemento = this.dados[0];
        for (let i = 1; i < this.dados.length; i++) {
            if (this.dados[i] !== primerElemento) {
                return false;
            }
        }
        return true;
    }
    /* Utilizamos un bucle for para iterar sobre cada elemento del array.
    luego utilizamos otro bucle for anidado para contar el número de ocurrencias
    en el array. Si elememento aparece cuatro veces en el array, retorna true.Si
    el bucle exterior se completa sin encontrar cuatro números iguales, retorna false.*/
    verificarPoker() {
        for (let i = 0; i < this.dados.length; i++) {
            const elemActual = this.dados[i];
            let count = 0;
            for (let j = 0; j < this.dados.length; j++) {
                if (this.dados[j] === elemActual) {
                    count++;
                }
                if (count === 4) {
                    return true;
                }
            }
        }
        return false;
    }
    /*Primero ordenamos el arreglo de menor a mayor con sort. Luego, iteramos a través de cada
    elemento del arreglo y verificamos si es igual al elemento anterior más 1. Si encontramos
    un elemento que no es consecutivo, devolvemos false. Si llegamos al final del bucle sin
    encontrar ningún elemento que no sea consecutivo, devolvemos true. */
    verificarEscalera() {
        this.dados.sort((a, b) => a - b);
        for (let i = 1; i < this.dados.length; i++) {
            if (this.dados[i] !== this.dados[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }
    /* Tomamos los valores de los dados y creamos un nuevo arreglo que contiene solo los valores
    únicos almacenados en dados utilizando Set. Luego, verificamos si numerosUnicos contiene dos
    valores únicos; si no es así, no puede haber un Full, por lo que la función devuelve false.
    Si hay exactamente dos valores únicos en numerosUnicos, contamos cuántas veces aparece uno de
    ellos en dados utilizando el método filter. Si ese valor aparece exactamente dos o tres veces,
    retornamostrue, de lo contrario, retornamos false. */
    verificarFull() {
        const numerosUnicos = this.dados.reduce((acumulador, valor) => {
            if (!acumulador.includes(valor)) {
                acumulador.push(valor);
            }
            return acumulador;
        }, []);
        if (numerosUnicos.length === 2) {
            const numRepetidos = this.dados.filter((num) => num === numerosUnicos[0]).length;
            return numRepetidos === 2 || numRepetidos === 3;
        }
        return false;
    }
}
exports.Dados = Dados;
