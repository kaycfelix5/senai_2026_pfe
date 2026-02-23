let hoje = new Date();
let ultimo = new Date('2026-12-31');
//console.log("Faltam "+(ultimo.getDate-hoje.getDay))
console.log("Faltam "+Math.round(((ultimo-hoje)/(1000*60*60*24)+1)));