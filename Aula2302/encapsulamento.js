class Pessoa {
    nome; //Atributo público
    #cpf = '00100200304'; //Atributo privado

    //metodos getter e setter
    //Metodos publicos de acesso aos atributos
    setcpf(valor){
        this.#cpf = valor;
    }
    getcpf(){
        return this.#cpf;
    }
}

const estudante = new Pessoa();//Instancia do objeto Pessoa
estudante.nome = 'Kayc';//Acesso ao atributo público nome
console.log(estudante.nome)
estudante.setcpf(22222222222222);//Acesso ao atributo privado CPF
console.log('O cpf é '+ estudante.getcpf());//Acesso ao atributo privado
console.log(estudante.nome);//Acesso ao atributo publico nome