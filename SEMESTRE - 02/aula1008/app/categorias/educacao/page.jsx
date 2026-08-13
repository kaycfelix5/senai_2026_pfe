import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function Educacao() {
  const articles = [
    {
      title: "SENAI Abre 20 Mil Vagas em Cursos Gratuitos de Capacitação Técnica",
      excerpt: "Oportunidades contemplam áreas de desenvolvimento de software, automação industrial e manutenção mecatrônica.",
      tag: "Capacitação",
      time: "Há 30 min",
      image: "/images/education_news.png"
    },
    {
      title: "Metodologia STEAM Transforma a Aprendizagem de Jovens no Brasil",
      excerpt: "Integração entre Ciência, Tecnologia, Engenharia, Arte e Matemática eleva engajamento e raciocínio lógico.",
      tag: "Metodologia",
      time: "Há 2 horas",
      image: "/images/hero_news.png"
    },
    {
      title: "Olimpíada do Conhecimento Reúne os Melhores Talentos da Formação Profissional",
      excerpt: "Competidores demonstram habilidades técnicas de alto nível em desafios inspirados no mercado de trabalho real.",
      tag: "Competição",
      time: "Há 4 horas",
      image: "/images/sports_hero.png"
    },
    {
      title: "Parceria entre SENAI e Big Techs Oferece Certificações Internacionais Gratuitas",
      excerpt: "Estudantes terão acesso direto a plataformas oficiais de treinamento em nuvem, IA e cibersegurança.",
      tag: "Parceria",
      time: "Ontem",
      image: "/images/tech_news.png"
    },
    {
      title: "Programa de Intercâmbio Técnico Leva Estudantes Brasileiros para a Alemanha",
      excerpt: "Selecionados vivenciarão a rotina de indústrias automatizadas de ponta durante três meses.",
      tag: "Intercâmbio",
      time: "Ontem",
      image: "/images/education_news.png"
    },
    {
      title: "Feira de Carreiras Conecta Alunos a Mais de 100 Empresas Contratantes",
      excerpt: "Evento presencial e online oferece oficinas de currículo, simulações de entrevista e vagas de estágio.",
      tag: "Mercado de Trabalho",
      time: "Há 2 dias",
      image: "/images/hero_news.png"
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
            <span style={{ color: "var(--accent-gold)" }}>Educação</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Educação & Carreiras</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Notícias sobre formação técnica, cursos gratuitos, bolsas de estudo e oportunidades profissionalizantes.
          </p>
        </section>

        {/* Featured Hero Story */}
        <div className="hero-main" style={{ backgroundImage: `url('/images/education_news.png')`, marginBottom: "3rem", minHeight: "380px" }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge badge-gold">Destaque de Educação</span>
            <h2 className="hero-title">
              Laboratórios de Robótica e Maker Spaces Revolucionam o Ensino Técnico Profissionalizante
            </h2>
            <p className="hero-excerpt">
              Com infraestrutura moderna de prototipagem 3D e bancadas automatizadas, alunos criam projetos com aplicação direta na indústria.
            </p>
            <div className="hero-meta">
              <span>Por Juliana Mendes (Editoria de Educação)</span>
              <span>•</span>
              <span>13 de Agosto, 2026</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Todas as Notícias de Educação</h2>
          </div>

          <div className="news-grid">
            {articles.map((item, idx) => (
              <article key={idx} className="news-card">
                <div className="card-image-wrapper">
                  <span className="card-badge badge badge-gold">{item.tag}</span>
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
