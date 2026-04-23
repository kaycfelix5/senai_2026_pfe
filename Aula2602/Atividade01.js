class jogador{//classe mamae
    #nome;
    #numero;
    constructor(nome,numero){
        this.#nome=nome;
    }
    treinar(){
        return '3 vezes na semana'
    }
    getnome(){
        return this.#nome;
    }
    getnumero(){
        return this.#numero;
    }
}

class JogadorfutebolAmericano extends jogador{
    #listaJogadas;
    #jardasConquistadas;
    constructor(listaJogadas,jardasConquistadas,nome,numero){
        this.#listaJogadas=listaJogadas;
        this.#jardasConquistadas=jardasConquistadas;
        super(nome,numero);
//super acessa atributo e método da classe mãe
       
    }
    fazerTouchDown(numero){
        return'O jogador número '+super.getnumero+' fez um TouchDown';
    }
    bloquear(listaJogadas){
        return 'O jogador '+super.getnome()+' bloqueou a jogada '+this.#listaJogadas;
    }
    correrJardas(){
        return 'o jogador '+super.getnome()+'numero '+super.getnumero()+'percorreu '+this.#jardasConquistadas()+'Jardas';
    }
}

class JogadorBasquete extends jogador{
    #alturaSalto;
    #totalCestas;
    constructor(alturaSalto,totalCestas,nome,numero){
        this.#alturaSalto=alturaSalto;
        this.#totalCestas=totalCestas;
        super(nome,numero);
}

const jogador=new JogadorfutebolAmericano('esquerdo',20,'Kayc','destaque',7);
jogador.bloquear('Ofensiva');
console.log(jogador.fazerTouchDown(5));
console.log(jogador.bloquear('Ofensiva'));
console.log(jogador.correrJardas(20));
