/*function cumprimento(nome){
    console.log("Seja bem vindo(a)! "+nome)
}
cumprimento("Kayc");

const somar = function(numero01,numero02){
    console.log("A soma dos números é : " + (numero01 + numero02))
}
somar(1,2);

const subtrair = (num01,num02) => {
    console.log("A subtração dos números é: "+(num01-num02));
}
subtrair(30,15);*/

const prompt = require('prompt-sync')();
let numero01=Number(prompt("Digite o primeiro número:"));
let sinal=prompt("Digite um sinal:");
let numero02=Number(prompt("Digite o segundo número:"));

const resultado = function( numero01,sinal,numero02) {
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
}
resultado(numero01,sinal,numero02)
