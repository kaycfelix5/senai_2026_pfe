const prompt = require('prompt-sync')();
let numero = Number(prompt("Digite um número que tenha raiz:"))
let n1;

while(numero!=n1*n1){
    n1 = Math.round(Math.random()*100)
} console.log("A raiz quadrada desse número é:"+n1)