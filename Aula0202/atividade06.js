const prompt = require('prompt-sync')();
let idade = Number(prompt("Digite sua idade:"));
if(idade<12){console.log("Você é uma criança de "+idade+" anos")} 
else if(idade>= 12 && idade < 18){console.log("Você é um adolescente de "+idade+" anos")}
else if(idade>= 18 && idade< 60) {console.log("Você é um adulto de "+idade+" anos")}
else {console.log("Você é um idoso de "+idade+" anos")}