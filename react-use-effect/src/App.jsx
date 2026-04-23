import { useState } from 'react'
import './App.css'
import Contador from './components/contador'
import Aluno from './components/alunos'
import BuscaCep from './components/buscaCep'
import ConectaAPI from './components/conectaAPI'

function App() {
  return(
  <>
  <Contador/>
  <Aluno/>
  <BuscaCep/>
  <ConectaAPI/>
  </>
  )
}

export default App
