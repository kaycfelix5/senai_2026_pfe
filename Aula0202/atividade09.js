const prompt = require('prompt-sync')();
let preco=Number(prompt("Digite o preço do produto: R$"))
let cupom=prompt("Digite o cupom (opcional):")
let BRONZE=(preco/100)*5
let PRATA=(preco/100)*10
let OURO=(preco/100)*15
if(cupom=="BRONZE"){console.log("Cupom BRONZE usado, valor pago: R$"+preco-BRONZE)} else
if(cupom=="PRATA"){console.log("Cupom PRATA usado, valor pago: R$"+preco-PRATA)} else
if(cupom=="OURO"){console.log("Cupom OURO usado, valor pago: R$"+preco-OURO)} else
{console.log("Sem cupom, preço pago: R$"+preco)}
