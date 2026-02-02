const prompt = require('prompt-sync')();
let altura = Number(prompt("Digite sua altura em M:"));
let peso = Number(prompt("Digite seu peso em Kg:"));
let imc= peso / (altura ** 2)
if(imc< 18.5){console.log("Abaixo do peso")}else if(imc>= 18.5 && imc < 25){console.log("Normal")}
else if(imc>= 25 && imc< 30){console.log("Sobrepeso")} else if(imc>= 30){console.log("Obesidade")}
