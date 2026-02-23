class Carro{
    //atributos
    modelo = 'S10 cabine dupla';
    dupla = 'Chevrolet';
    ano = 2025;
    preco = 200000;


    //Metodos
    mover(){
        console.log('Estou me movendo');
    }
    mostrar(){
        console.log('O carro é: ' + this.modelo +' '+ this.marca + ' ' + this.ano + ' ' + this.preco);
    }
}

const Caminhonete = new Carro();//Instanciar a classe = criar objetos
Caminhonete.mover();//Utilizar metodos
Caminhonete.mostrar();//Utilizar metodos