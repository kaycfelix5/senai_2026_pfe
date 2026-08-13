"use client";

import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { newsArticles } from "../data/newsData";

export default function Categorias() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todas");

  const categories = [
    { id: "esportes", title: "Esportes", icon: "⚽", badge: "badge-blue", href: "/categorias/esportes" },
    { id: "tecnologia", title: "Tecnologia & IA", icon: "💻", badge: "badge-green", href: "/categorias/tecnologia" },
    { id: "educacao", title: "Educação & Carreiras", icon: "🎓", badge: "badge-gold", href: "/categorias/educacao" },
    { id: "economia", title: "Economia & Negócios", icon: "📈", badge: "badge-red", href: "/categorias/economia" },
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedFilter === "todas" || article.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* Header Section */}
        <section className="section-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", marginBottom: "2rem" }}>
          <span className="badge badge-red">Central de Notícias</span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Editorias e Categorias</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Explore e pesquise por todas as matérias jornalísticas do portal Sesi News.
          </p>
        </section>

        {/* Search & Filter Component */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar notícias por palavra-chave ou título..."
              className="search-input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-chips">
            <button
              onClick={() => setSelectedFilter("todas")}
              className={`filter-chip ${selectedFilter === "todas" ? "active" : ""}`}
            >
              Todas
            </button>
            <button
              onClick={() => setSelectedFilter("esportes")}
              className={`filter-chip ${selectedFilter === "esportes" ? "active" : ""}`}
            >
              ⚽ Esportes
            </button>
            <button
              onClick={() => setSelectedFilter("tecnologia")}
              className={`filter-chip ${selectedFilter === "tecnologia" ? "active" : ""}`}
            >
              💻 Tecnologia
            </button>
            <button
              onClick={() => setSelectedFilter("educacao")}
              className={`filter-chip ${selectedFilter === "educacao" ? "active" : ""}`}
            >
              🎓 Educação
            </button>
            <button
              onClick={() => setSelectedFilter("economia")}
              className={`filter-chip ${selectedFilter === "economia" ? "active" : ""}`}
            >
              📈 Economia
            </button>
          </div>
        </div>

        {/* Category Cards Hub */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.id} href={cat.href} className="category-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="category-icon-box">{cat.icon}</div>
                <span className={`badge ${cat.badge}`}>Ver Editoria</span>
              </div>
              <div>
                <h3 className="category-card-title">{cat.title}</h3>
                <p className="category-card-desc" style={{ marginTop: "0.5rem" }}>
                  Acesse todas as reportagens exclusivas sobre {cat.title.toLowerCase()}.
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Dynamic Filtered Articles Grid */}
        <section style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h2 className="section-title">
              Notícias Encontradas ({filteredArticles.length})
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", background: "var(--bg-surface)", borderRadius: "var(--radius-lg)" }}>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
                Nenhuma notícia encontrada para a pesquisa "{searchTerm}".
              </p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedFilter("todas"); }}
                className="btn-primary"
                style={{ marginTop: "1rem" }}
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="news-grid">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/noticias/${article.id}`} className="news-card">
                  <div className="card-image-wrapper">
                    <span className={`card-badge badge ${article.badgeClass}`}>{article.categoryName}</span>
                    <img src={article.image} alt={article.title} className="card-image" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{article.title}</h3>
                    <p className="card-excerpt">{article.excerpt}</p>
                    <div className="card-footer">
                      <span>{article.author}</span>
                      <span>{article.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
