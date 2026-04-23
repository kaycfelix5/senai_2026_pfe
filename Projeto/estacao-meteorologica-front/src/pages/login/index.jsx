import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import imgEstacao from "../../assets/Meteo.png";

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <section className="login-container">
            <div className="login-card">

                {/* IMAGEM ESQUERDA */}
                <div className="login-image">
                    <img src={imgEstacao} alt="Background" />
                    <div className="overlay"></div>
                    <h1 className="image-title">Bem-vindo</h1>
                </div>

                {/* FORM DIREITA */}
                <div className="login-form">
                    <h2>Login</h2>

                    <form>
                        <div className="input-group">
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                            <label htmlFor="usuario">Usuário</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <label htmlFor="senha">Senha</label>
                        </div>

                        <Link to="/dashboard" className="login-button">
                            Entrar
                        </Link>
                        <p><Link to="/register" className="link-secondary">Não tem conta? Cadastre-se</Link></p>
                    </form>
                </div>

            </div>
        </section>
    );
}