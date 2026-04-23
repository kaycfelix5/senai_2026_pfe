export default function Footer(){
    return(
        <footer>
            <p>
                ©️
            </p>
            <script>
                const data_atual = new Date();
                document.write(data_atual.getFullYear())
            </script>
            Academia FoFitness. Todos os direitos reservados
        </footer>
    )
}