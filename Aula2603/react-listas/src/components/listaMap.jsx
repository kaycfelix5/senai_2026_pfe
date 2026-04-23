const estudantes = [
    {id: 1,nome: 'Pedro Rocath', ra: 123444, idade: 17},
    {id: 2,nome: 'Pedro Gonzales', ra: 587458, idade: 17},
    {id: 3,nome: 'Pedro Silva', ra: 968574, idade: 17}
]

export default function ListaMap({titulo}){
    const listaEstudandes = estudantes.map((estudante) => {
        return <li key={estudante.id}>
            <h3>{estudante.nome}</h3>
            <p>{estudante.ra}</p>
            <p>{estudante.idade}</p>
        </li> 
        })
    return(
        <>
        
        <h1>{titulo}</h1>
        <ul >
            {listaEstudandes}
        </ul>
        </>
    )
}