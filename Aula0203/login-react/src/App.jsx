import './App.css';
import logSesi from './assets/img/logo-sesi.png';//importando imagens
import logSenai from './assets/img/logo-senai.png'

export default function App() {
  return(
    
    <>
    <div className="container">
      <img src={logSesi} alt="Logo do Sesi" className="logo" />
      <img src={logSenai} alt="Logo do Senai" className="logo" />
      <h1 className="titulo">Login</h1>
      
      <span className="subtitulo">Para continuar</span>
      <label htmlFor="nome" className="label">Nome</label>
      <input type="text" className="campo" id='nome' placeholder='Seu nome' />
      <label htmlFor="senha" className="label">Senha</label>
      <input type="password" className="campo" id='senha' placeholder='*****' />
      <button className='botao'>Log in</button>
      <a className='textoFooter'>Esqueceu a senha?</a>
      <a className='textoFooter'>Cadastre-se</a>
    </div>
    <div className="teste">

    </div>
    </>
  )
}
