const prompt = require('prompt-sync')();
let idade = Number(prompt("Digite sua idade:"))
if(idade>=18){console.log("Você é maior de idade e pode pegar livros")} 
else if(idade<18&&idade>=16){console.log("Você pode pegar livros, mas não é maior de idade")}
 else {console.log("Você não possui idade suficiente")}