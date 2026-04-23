class jogador{//classe mamae
    #nome;
    #numero;
    constructor(nome,numero){
        this.#nome=nome;
        this.#numero=numero;
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

class Jogadorfutebol extends jogador{
    #peDominante;
    #totalGols;
    constructor(peDominante,totalGols,nome,numero){
        this.#peDominante=peDominante;
        this.#totalGols=totalGols;
        super(nome,numero);
//super acessa atributo e método da classe mãe
       
    }
    driblar(){
        return'tomou uma caneta';
    }
    fazerGol(qtsGols){
        this.#totalGols+=qtsGols;
    }
    mostrar(){
        return 'o jogador '+super.getnome()+'numero '+super.getnumero()+'pé dominante '+this.#peDominante+'tem '+this.#totalGols+'gols';
    }
}

const jogador=new Jogadorfutebol('esquerdo',20,'kelvin','destaque',7);
jogador.fazerGol(2);
console.log(jogador.mostrar());
