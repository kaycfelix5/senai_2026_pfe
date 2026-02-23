const prompt = require('prompt-sync')();
let numero=Number(prompt("Digite um número decimal:"))
console.log("Aproximando seu número,o resultado é "+Math.round(numero))