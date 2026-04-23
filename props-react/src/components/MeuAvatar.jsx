

export default function Informacao(props){
    return(
        <>
        <h1>{props.titulo}</h1>
        <h3>{props.nome}<span>{props.idade}</span></h3>
        <img src={props.foto}></img>
        <h3>{props.estilo}</h3>
        <h3>{props.disciplina}</h3>
        </>
    )
}