const frutas = [
    {id: 1,nome: 'Maça'},
    {id: 2,nome: 'Banana'},
    {id: 3,nome: 'Abacaxi'},
    {id: 4,nome: 'Melancia'},
    {id: 5,nome: 'Caju'}
]
export default function ListaFrutas({titulo}){
    const listaFrutas = frutas.map((fruta) => {
        return <li key={fruta.id}>
            <h3>{fruta.nome}</h3>
        </li> 
        })
    return(
        <>
        
        <h1>{titulo}</h1>
        <ul >
            {listaFrutas}
        </ul>
        </>
    )
}