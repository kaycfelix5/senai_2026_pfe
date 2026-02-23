const prompt = require('prompt-sync')();
let pontuacao=Number(prompt("Digite a pontuação do aluno:"));
console.log("Os pontos do aluno são:"+(pontuacao/2)**2);