const prompt = require('prompt-sync')();
let n1 = Number(prompt("Digite um número: "));
if(n1%2==0){console.log(n1+" É um número par")} else {console.log(n1+" É um número impar")}