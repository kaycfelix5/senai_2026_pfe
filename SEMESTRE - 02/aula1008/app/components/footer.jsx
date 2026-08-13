"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="site-footer">
      {subscribed && (
        <div className="toast-notification">
          🎉 Obrigado por se inscrever na newsletter do Sesi News!
        </div>
      )}

      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo-group">
            <div className="logo-badge">S</div>
            <div className="logo-text">
              SESI<span>NEWS</span>
            </div>
          </div>
          <p>
            Informação com credibilidade, agilidade e profundidade. O seu portal definitivo de notícias e grandes acontecimentos.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-heading">Navegação</h4>
          <ul className="footer-links">
            <li><Link href="/">Início</Link></li>
            <li><Link href="/categorias">Categorias</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div style={{ gridColumn: "span 2" }}>
          <h4 className="footer-heading">Receba as Notícias</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Assine nossa newsletter diária e fique por dentro de tudo.
          </p>
          <form onSubmit={handleSubmit} className="newsletter-form" style={{ maxWidth: "400px" }}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Assinar</button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Sesi News. Todos os direitos reservados.</p>
        <p>Desenvolvido para o curso SENAI PFE</p>
      </div>
    </footer>
  );
}