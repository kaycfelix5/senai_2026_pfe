class Estudante{
    nome;
    #ra;
    #cpf;

    constructor(nome, ra, cpf){
        this.nome = nome;
        this.#ra = ra;
        this.#cpf = cpf;
    }
}

const Kayc = new Estudante('Kayc Félix da Silva Loche',2665,45622033529)
console.log(Kayc)