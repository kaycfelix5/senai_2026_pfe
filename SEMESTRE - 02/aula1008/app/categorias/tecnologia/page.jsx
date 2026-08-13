import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function Tecnologia() {
  const articles = [
    {
      title: "IA Generativa Reduz Tempo de Projeto de Componentes Industriais em 70%",
      excerpt: "Engenheiros utilizam algoritmos generativos para criar peças mais leves, resistentes e com menor uso de matéria-prima.",
      tag: "Inteligência Artificial",
      time: "Há 1 hora",
      image: "/images/tech_news.png"
    },
    {
      title: "Segurança Cibernética: As Novas Ameaças em Ambientes de Nuvem Industrial",
      excerpt: "Especialistas alertam para a importância de sistemas de defesa cibernética proativos em redes de automação.",
      tag: "Cibersegurança",
      time: "Há 3 horas",
      image: "/images/hero_news.png"
    },
    {
      title: "Robôs Autônomos de Logística Ganham Espaço em Centros de Distribuição",
      excerpt: "Nova geração de robôs equipados com visão computacional opera 24 horas por dia com máxima precisão.",
      tag: "Robótica",
      time: "Há 5 horas",
      image: "/images/education_news.png"
    },
    {
      title: "Pesquisadores Desenvolvem Baterias de Estado Sólido com Vida Útil Duplicada",
      excerpt: "Avanço promete transformar o mercado de veículos elétricos e armazenamento de energia solar no Brasil.",
      tag: "Inovação",
      time: "Ontem",
      image: "/images/sports_futsal.png"
    },
    {
      title: "Testes da Rede 6G Atingem Velocidade Recorde em Transmissão de Dados",
      excerpt: "Conectividade de ultra-baixa latência permitirá cirurgias remotas em tempo real e controle de frotas autônomas.",
      tag: "Telecom",
      time: "Ontem",
      image: "/images/sports_swimming.png"
    },
    {
      title: "Realidade Aumentada Simplifica Manutenção de Maquinário Complexo",
      excerpt: "Técnicos utilizam óculos inteligentes para visualizar esquemas 3D sobrepostos ao equipamento físico.",
      tag: "Realidade Aumentada",
      time: "Há 2 dias",
      image: "/images/tech_news.png"
    }
  ];

  return (
    <div className="page-wrapper">
      <Header />

      <main className="main-content">
        {/* Breadcrumb */}
        <section className="section-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-secondary)" }}>Início</Link>
            <span>/</span>
            <Link href="/categorias" style={{ color: "var(--text-secondary)" }}>Categorias</Link>
            <span>/</span>
            <span style={{ color: "var(--accent-green)" }}>Tecnologia</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Tecnologia & Inovação</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Acompanhe as últimas descobertas científicas, avanços em IA, robótica e transformação digital.
          </p>
        </section>

        {/* Featured Hero Story */}
        <div className="hero-main" style={{ backgroundImage: `url('/images/tech_news.png')`, marginBottom: "3rem", minHeight: "380px" }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge badge-green">Destaque de Tecnologia</span>
            <h2 className="hero-title">
              Revolução dos Chips Quânticos: O Salto Tecnológico que Promete Mudar a Indústria
            </h2>
            <p className="hero-excerpt">
              Processadores quânticos de nova geração atingem estabilidade operacional e abrem caminho para soluções inéditas em medicina e materiais avançados.
            </p>
            <div className="hero-meta">
              <span>Por Camila Rocha (Editoria de Tecnologia)</span>
              <span>•</span>
              <span>13 de Agosto, 2026</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Todas as Notícias de Tecnologia ({articles.length})</h2>
          </div>

          <div className="news-grid">
            {articles.map((item, idx) => (
              <article key={idx} className="news-card">
                <div className="card-image-wrapper">
                  <span className="card-badge badge badge-green">{item.tag}</span>
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-excerpt">{item.excerpt}</p>
                  <div className="card-footer">
                    <span>{item.tag}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
