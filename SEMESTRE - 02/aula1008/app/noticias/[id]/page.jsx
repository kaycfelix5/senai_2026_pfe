"use client";

import { use, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";
import { getArticleById, newsArticles } from "../../data/newsData";

export default function ArticlePage({ params }) {
  const unwrappedParams = use(params);
  const article = getArticleById(unwrappedParams.id);
  const [toastMessage, setToastMessage] = useState("");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMessage("Link copiado para a área de transferência!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const relatedArticles = newsArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <div className="page-wrapper">
      <Header />

      {toastMessage && (
        <div className="toast-notification">
          ✓ {toastMessage}
        </div>
      )}

      <main className="main-content">
        <article className="article-page">
          {/* Breadcrumb */}
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "var(--text-secondary)" }}>Início</Link>
            <span>/</span>
            <Link href="/categorias" style={{ color: "var(--text-secondary)" }}>Notícias</Link>
            <span>/</span>
            <span style={{ color: "var(--accent-red)" }}>{article.categoryName}</span>
          </div>

          {/* Header */}
          <header className="article-header">
            <span className={`badge ${article.badgeClass}`}>{article.categoryName}</span>
            <h1 className="article-title">{article.title}</h1>
            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
              {article.excerpt}
            </p>
            <div className="article-meta">
              <span>✍️ {article.author} ({article.authorRole})</span>
              <span>•</span>
              <span>📅 {article.date}</span>
              <span>•</span>
              <span>⏱️ {article.readTime}</span>
            </div>
          </header>

          {/* Cover Image */}
          <img src={article.image} alt={article.title} className="article-hero-img" />

          {/* Article Body */}
          <div className="article-body">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Share Bar */}
          <div className="share-bar">
            <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Compartilhar esta notícia:</span>
            <button onClick={handleShare} className="share-btn">📋 Copiar Link</button>
            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`)} className="share-btn">🐦 X (Twitter)</button>
            <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title)}`)} className="share-btn">💬 WhatsApp</button>
          </div>

          {/* Author Box */}
          <div className="author-box">
            <div className="author-avatar">{article.author.charAt(0)}</div>
            <div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{article.author}</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                {article.authorRole} no Portal Sesi News. Especialista na cobertura jornalística de tecnologia, educação e indústria 4.0.
              </p>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section style={{ marginTop: "4rem" }}>
          <div className="section-header">
            <h2 className="section-title">Notícias Relacionadas</h2>
          </div>

          <div className="news-grid">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} href={`/noticias/${rel.id}`} className="news-card">
                <div className="card-image-wrapper">
                  <span className={`card-badge badge ${rel.badgeClass}`}>{rel.categoryName}</span>
                  <img src={rel.image} alt={rel.title} className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.title}</h3>
                  <p className="card-excerpt">{rel.excerpt}</p>
                  <div className="card-footer">
                    <span>{rel.author}</span>
                    <span>{rel.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
