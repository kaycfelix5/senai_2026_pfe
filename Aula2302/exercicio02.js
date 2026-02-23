class Bicicleta {
    #modelo;
    #marca;
    #cor;
    #velocidade_maxima;
    
    setmodelo(valor){
        this.#modelo = valor;
    }
    getmodelo(){
        return this.#modelo;
    }

    setmarca(valor){
        this.#marca = valor;
    }
    getmarca(){
        return this.#marca;
    }

    setcor(valor){
        this.#cor = valor;
    }
    getcor(){
        return this.#cor;
    }

    setvelocidade_maxima(valor){
        if (valor>35){console.log("Não é possível inserir acima de 35KM/H")} else {
        this.#velocidade_maxima = valor; }
    }
    getvelocidade_maxima(){
        return this.#velocidade_maxima;
    }
}
const caloi = new Bicicleta;
caloi.setmodelo('Hibrida');
console.log(caloi.getmodelo());
caloi.setmarca('Caloi');
console.log(caloi.getmarca());
caloi.setcor('Azul');
console.log(caloi.getcor());
caloi.setvelocidade_maxima(55);
console.log(caloi.getvelocidade_maxima());