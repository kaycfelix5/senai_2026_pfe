// guardar uma informação que pode mudar (como um número, um nome ou se um menu está aberto ou fechado).
// O estado começa como 'Desligado'
const [luz, setLuz] = useState('Desligado');
// Para ligar, você usa o "controle remoto":
setLuz('Ligado'); 
// O React vê isso e atualiza a lâmpada na tela na hora!
//Por que não usar uma variável comum?
//Se você usar uma variável normal (let valor = 0), você até consegue mudar o número, mas o React não percebe. A tela continua mostrando o número antigo.
//Quando você usa o Controle Remoto (a função de atualizar), o React diz: "Opa, a caixa mudou! Deixa eu desenhar a tela de novo com o valor novo".