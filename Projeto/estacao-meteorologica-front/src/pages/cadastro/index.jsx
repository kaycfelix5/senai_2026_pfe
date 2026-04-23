import { useState } from "react";
import Header from "../../components/header";
import "./cadastro.css";

export default function Cadastro(){
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [documento, setDocumento] = useState('')

    return(
        <section className="container">
            <Header />
            <h2>Cadastro de Dados Pessoais</h2>
            <form action="">
                <h5>Dados Pessoais</h5>
                <label htmlFor="nome">Nome</label>
                <input type="text" id='nome' placeholder="Nome completo..." value={nome} onChange={(e) => setNome(e.target.value)}/>
                <label htmlFor="endereco">Endereço</label>
                <input type="text" id='endereco' placeholder="Endereço completo..." value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                <label htmlFor="email">Emai</label>
                <input type="text" id='email' placeholder="Email completo..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="celular">Celular</label>
                <input type="text" id='celular' placeholder="Celular completo..." value={celular} onChange={(e) => setCelular(e.target.value)}/>
                <label htmlFor="documento">Documento</label>
                <input type="text" id='documento' placeholder="Documento completo..." value={documento} onChange={(e) => setDocumento(e.target.value)}/>            

                <button>
                    Salvar
                </button>            
            </form>
        </section>
    )
}