async function main() {
    const resp = await fetch("https://randomuser.me/api/");
    const json = await resp.json();

    if (Array.isArray(json)) {
        console.log("Trata-se de um array/vetor de uma linha(unidimensional)");
        console.log(json);
    } else {
        console.log("Trata-se de um objeto");
       
        // Retorna todos os usuários
        // console.log(json.results);

        // Retorna apenas o primeiro usuário
        // console.log(json.results[0]);

        // Retorna um atributo específico (equivalente ao body)
        console.log(json.results[0].name.first);
    }
}

main();