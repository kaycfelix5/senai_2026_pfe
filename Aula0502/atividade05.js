const prompt = require('prompt-sync')();
let idade = Number(prompt("Digite o ano em que você nasceu: "))
let tempo = new Date();
console.log("Esse ano você tem: "+(tempo.getFullYear()-idade));