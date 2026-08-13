import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { newsArticles } from "../data/newsData";

export default function Inicio() {
  const heroArticle = newsArticles[0];
  const gridArticles = newsArticles.slice(1);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          {/* Main Hero Article */}
          <Link
            href={`/noticias/${heroArticle.id}`}
            className="hero-main"
            style={{ backgroundImage: `url('${heroArticle.image}')` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="badge badge-red">Destaque Principal</span>
              <h1 className="hero-title">{heroArticle.title}</h1>
              <p className="hero-excerpt">{heroArticle.excerpt}</p>
              <div className="hero-meta">
                <span>Por {heroArticle.author}</span>
                <span>•</span>
                <span>{heroArticle.date}</span>
                <span>•</span>
                <span>{heroArticle.readTime}</span>
              </div>
            </div>
          </Link>

          {/* Trending Sidebar */}
          <aside className="trending-sidebar">
            <h3 className="sidebar-title">🔥 Mais Lidas</h3>
            <ul className="trending-list">
              {gridArticles.slice(0, 4).map((item, idx) => (
                <li key={item.id} className="trending-item">
                  <span className="trending-number">0{idx + 1}</span>
                  <div>
                    <span className={`badge ${item.badgeClass}`} style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}>
                      {item.categoryName}
                    </span>
                    <h4 className="trending-headline">
                      <Link href={`/noticias/${item.id}`}>
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* Latest News Grid Section */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Últimas Notícias</h2>
            <Link href="/categorias" className="badge badge-red" style={{ textTransform: "none" }}>
              Ver todas as categorias →
            </Link>
          </div>

          <div className="news-grid">
            {gridArticles.map((article) => (
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
        </section>
      </main>

      <Footer />
    </div>
  );
}