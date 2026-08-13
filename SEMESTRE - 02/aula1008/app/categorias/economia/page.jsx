import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function Economia() {
  const articles = [
    {
      title: "Setor Industrial Registra Alta de 4,2% na Produção impulsionado pela Tecnologia",
      excerpt: "Automação avançada e digitalização de processos impulsionam ganho de produtividade nas fábricas brasileiras.",
      tag: "Indústria",
      time: "Há 1 hora",
      image: "/images/hero_news.png"
    },
    {
      title: "Startups de Climatch Atraem Recorde de Aportes Financeiros em 2026",
      excerpt: "Fundos de investimento priorizam tecnologias voltadas para descarbonização e eficiência energética.",
      tag: "Investimentos",
      time: "Há 3 horas",
      image: "/images/tech_news.png"
    },
    {
      title: "Mercado de Crédito de Carbono Movimenta Bilhões e Atrai Pequenas Empresas",
      excerpt: "Mecanismos de compensação ambiental geram nova fonte de receita para indústrias sustentáveis.",
      tag: "Sustentabilidade",
      time: "Há 6 horas",
      image: "/images/education_news.png"
    },
    {
      title: "Exportações da Indústria de Transformação Crescem 12% no Semestre",
      excerpt: "Demanda aquecida por componentes de alta tecnologia impulsiona balança comercial favorável.",
      tag: "Comércio Exterior",
      time: "Ontem",
      image: "/images/hero_news.png"
    },
    {
      title: "Transição Energética: Usinas Solares Industriais Reduzem Custos em até 50%",
      excerpt: "Auto-geração de energia se consolida como pilar estratégico para competitividade empresarial.",
      tag: "Energia",
      time: "Ontem",
      image: "/images/tech_news.png"
    },
    {
      title: "Inflação sob Controle Favorece Aumento do Poder de Compra e Vendas no Varejo",
      excerpt: "Consumo das famílias mantém ritmo aquecido no segundo semestre impulsionado pelo mercado de trabalho.",
      tag: "Mercado",
      time: "Há 2 dias",
      image: "/images/sports_hero.png"
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
            <span style={{ color: "var(--accent-red)" }}>Economia</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Economia, Negócios & Mercado</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Análises de mercado, finanças, investimentos industriais e tendências da economia global.
          </p>
        </section>

        {/* Featured Hero Story */}
        <div className="hero-main" style={{ backgroundImage: `url('/images/hero_news.png')`, marginBottom: "3rem", minHeight: "380px" }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge badge-red">Destaque de Economia</span>
            <h2 className="hero-title">
              Investimento em Energia Renovável no Brasil Cresce 35% e Bate Recorde Histórico
            </h2>
            <p className="hero-excerpt">
              Projetos de energia eólica e solar atração investimentos bilionários de grandes conglomerados globais em 2026.
            </p>
            <div className="hero-meta">
              <span>Por Ricardo Antunes (Editoria de Economia)</span>
              <span>•</span>
              <span>13 de Agosto, 2026</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Todas as Notícias de Economia</h2>
          </div>

          <div className="news-grid">
            {articles.map((item, idx) => (
              <article key={idx} className="news-card">
                <div className="card-image-wrapper">
                  <span className="card-badge badge badge-red">{item.tag}</span>
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
