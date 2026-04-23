import './App.css'
/*import Info from './components/MeuAvatar'*/
import PropsNomeado from './components/propsNomeado'

/*function App(){
  return(
    <Info titulo = 'Bem Vindo!'
    nome = 'Kayc Félix'
    idade = '17 anos'
    foto = 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic2714859.webp?w=760&h=507'
    estilo = 'Pagode'
    disciplina = 'Matemática'
    />
  )
}*/

function App(){
  return(
    <PropsNomeado
    titulo = 'Usando Props Nomeado'
    subtitulo = 'Aprendendo props named'/>
  )
}

export default App