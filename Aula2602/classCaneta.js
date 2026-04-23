class Caneta{
    //atributos públicos
    cor = 'azul';
    marca = 'Faber Castel';
    ponta = 'Fina';
    qtdTinta = 5;
    tampa = false;

    //metodo tem parenteses
    escrever(){
        return 'Começou a escrever'
    }
    sublinhar(valor){
        if(valor>this.qtdTinta){return 'Tinta insuficiente para o valor'}
        else{
        this.qtdTinta -= valor //subtrai o valor da quantidade de tinta e retorna o valor
        return 'Quantidade restante de tinta: '+this.qtdTinta;}
    }
}
const canetaFina = new Caneta();
console.log(canetaFina.escrever());
console.log(canetaFina.sublinhar(5));