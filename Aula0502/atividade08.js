const prompt = require('prompt-sync')();
let numero = Math.round(Math.random()*10)
let resposta;

while(resposta!=numero){
    resposta = Number(prompt("Adivinhe um número de 0 a 10:"))
    console.log(numero)
} console.log("Parabéns, você acertou!")