const estudantes = [
    {id: 1,nome: 'Pedro Rocath', ra: 123444, disciplina: 'Matemática'},
    {id: 2,nome: 'Pedro Gonzales', ra: 587458, disciplina: 'Matemática'},
    {id: 3,nome: 'Pedro Silva', ra: 968574, disciplina: 'Inglês'}
]

export default function ListaFilter({titulo}){
    const lista = estudantes.filter(estudante => estudante.disciplina == 'Matemática')
    const listaEstudandes = lista.map((estudante) => {
        return <li key={estudante.id}>
            <h3>{estudante.nome}</h3>
            <p>{estudante.ra}</p>
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