// var x;
// let y;
// const z = "algo";

// saludar();
// //hoisting: apenas se carga un documento javascript, todos los lugares donde hayan funciones declaradas es como que javascript tome esas funciones 
// //y las lleva para el incio del documento
// function saludar() {
//     console.log("hola!");
// }

// let saludar2 = () => {
//     console.log("hola!");
// }

// saludar2();

// function saludar3(nombre) {
//     console.log("hola " + nombre + "!");
// }

// const saludar4 = nombre => {
//     console.log(`hola ${nombre}`);
// }

// function sumar(a, b) {
//     let suma = a + b;
//     return suma;
// }

// let res = sumar(4, 6);

// const sumar2 = (a, b) => {
//     let suma = a + b;
//     return suma;
// }
// //      ||
// const sumar3 = (a, b = 6) => a + b;
// let result = sumar3(4);

// const triplicar = n => n * 3;
// let triple = triplicar(4);

// let num = 5;

// if (num > 2) {
//     console.log("mayor");
// } else {
//     console.log("menor");

// }
// if (num > 2) {
//     console.log("mayor");
// } else {
//     console.log("menor");

// }

// //condicional ternario
// (num > 2) ? console.log("mayor") : console.log(menor);

// let nombres = ["Santiago", "Facundo", "Sebastían", "Fiorella"];

// nombres.forEach(function (nombre) {
//     console.log(nombre);
// });

// nombres.forEach((nom, pos) => {
//     console.log(nom, pos);
// })

// nombres.forEach((nom, pos) => console.log(nom, pos));

// let seleccionados = nombres.filter(function (nombre) {

//     let seleccionar;
//     if (nombre.charAt(0) === "S") {
//         seleccionar = true;
//     } else {
//         seleccionar = false;
//     }
//     return seleccionar;

// });

// let seleccionados2 = nombres.filter(nombre => nombre.charAt(0) === "S");
// console.log(seleccionados2);

// let buscado = nombres.find(nombre => nombre.charAt(nombre.length - 1) === "a");
// console.log(buscado);

// let conGuion = nombres.map(nombre => `-${nombre}-`);

// console.log(conGuion);


let nombres = ["Santiago", "Facundo", "Sebastían", "Fiorella"];
//Deconstructuring
// let nombre = nombres[0];
// let nombre2 = nombres[1];
// let [nombre1, nombre2, nombre3] = nombres;
// let [nombre1, , nombre2] = nombres;
// console.log(nombre2);

// let a = 4;
// let b = 5;
// [a, b] = [b, a];
// console.log(a);

// let persona = { nombre: "Santiago", edad: 33 };

// let { nombre, edad } = persona;
// console.log(edad);

// const saludar = (objPersona) => {//objPersona = nombre: "Santiago", edad : 33
//     console.log(`Hola soy ${objPersona.nombre}, tengo ${objPersona.edad}`);
// }
// saludar(persona);

// const saludar2 = ({ nombre, edad }) => {//nombre, edad = nombre: "Santiago", edad : 33
//     console.log(`Hola soy ${nombre}, tengo ${edad}`);
// }
// saludar2(persona);

//Spread
// let numero1 = 4;
// //asignación por copia
// let numero2 = numero1;
// numero1 = 6;
// console.log(numero2); //4

// let numeros1 = [4, 5];
// //asignación por referencia
// let numeros2 = numeros1;
// numeros1.push(6);
// console.log(numeros2); //[4,5,6]

// let letras = ["a", "b", "c"];
// let letrasCopia = [...letras, "e"];// ['a', 'b', 'c', 'e']
// letras.push("d")
// // ['a', 'b', 'c', 'd']
// console.log(letrasCopia);

// //Inmutabilidad: que no cambia, en cambio genera una copia, algo nuevo

// // [
// //     ['a', 'b', 'c']
// //     ['a', 'b', 'c', 'd']
// //     ['a', 'b', 'c']
// // ]

// let masLetras = ["f", "g"];
// let todasLetras = [...letrasCopia, ...masLetras];
// console.log(todasLetras);

// let persona2 = { nombre: "Alexis", edad: 22 }
// let persona3 = {...persona2};
// persona2.edad = 28;
// console.log(persona3);
// let masDatos = {direccion:"x"};
// let persona4 = {...persona2, ...masDatos};

fetch("https://randomuser.me/api/?results=50")
.then(r => r.json())
.then(datos => {
    console.log(datos);
})
