const prompt = require('prompt-sync')();
let nota=Number(prompt("Digite sua nota:"))
if(nota>= 90){console.log("Você recebeu um A")} else if(nota>= 80){console.log("Você recebeu um B")}
else if(nota>= 70){console.log("Você recebeu um C")} else if(nota>= 60){console.log("Você recebeu um D")}
else if(nota< 60){console.log("Você recebeu um F")};