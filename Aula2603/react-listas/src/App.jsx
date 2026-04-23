import ListaSimples from "./components/listaSimples"
import ListaMap from "./components/listaMap"
import ListaFrutas from "./components/listaFrutas"
import ListaFilter from "./components/listaFilter"
function App() {
  
  return (
    <>
      <ListaSimples></ListaSimples>
      <ListaMap titulo = 'Aprendendo Listas no React'></ListaMap>
      <ListaFrutas titulo = 'Lista de Frutas que gosto'></ListaFrutas>
      <ListaFilter titulo = 'Lista Estudandes Filter'></ListaFilter>
    </>
  )
}

export default App
