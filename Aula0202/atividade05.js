const prompt = require('prompt-sync')();
let R1 = Number(prompt("Digite um número:"));
let R2 = Number(prompt("Digite um outro número:"))
if(R1==0&&R2==0){console.log("Ambos os números são iguais a 0 ")} 
else if(R1==R2){console.log("Ambos são iguais a "+R1)} 
else if(R1>R2){console.log(R1 +" é maior que "+R2)} 
else {console.log(R2 +" é maior que "+R1)}
