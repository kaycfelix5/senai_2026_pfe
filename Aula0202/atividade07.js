const prompt = require('prompt-sync')();
let numero01=Number(prompt("Digite o primeiro número:"));
let sinal=prompt("Digite um sinal:");
let numero02=Number(prompt("Digite o segundo número:"));
switch (sinal) {
    case "+": console.log(numero01+numero02);
    break
    case  "-": console.log(numero01-numero02);
    break
    case "*":console.log(numero01*numero02);
    break
    case "/":console.log(numero01/numero02);
    break
    default:console.log("Erro meu nobre")
}