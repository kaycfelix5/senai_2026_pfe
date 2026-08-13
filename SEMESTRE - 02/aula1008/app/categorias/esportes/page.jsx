import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function Esportes() {
  const matches = [
    { league: "Copa Estudantil", teamA: "Sesi FC", scoreA: 2, teamB: "Senai Tech", scoreB: 1, status: "AO VIVO 84'", live: true },
    { league: "Liga de Basquete", teamA: "Hawks", scoreA: 94, teamB: "Titans", scoreB: 88, status: "FINAL", live: false },
    { league: "Vôlei Masculino", teamA: "Spikers", scoreA: 3, teamB: "Blockers", scoreB: 1, status: "FINAL", live: false },
    { league: "Futsal Sub-20", teamA: "Águias", scoreA: 4, teamB: "Leões", scoreB: 4, status: "PENÂLTIS", live: false },
  ];

  const articles = [
    {
      title: "Torneio de E-Sports Estudantil Reúne 64 Equipes em Arena Gamers",
      excerpt: "Jogadores se enfrentaram em disputas eletrizantes de Valorant e League of Legends transmitidas ao vivo com grande audiência.",
      tag: "E-Sports",
      time: "Há 1 hora",
      image: "/images/sports_hero.png"
    },
    {
      title: "Seleção Estudantil de Futsal Vence Amistoso Internacional na Argentina",
      excerpt: "Em jogo disputado gol a gol, a equipe brasileira garantiu a vitória nos segundos finais da partida com atuação brilhante.",
      tag: "Futsal",
      time: "Há 3 horas",
      image: "/images/sports_futsal.png"
    },
    {
      title: "Natação: Jovens Promessas Conquistam 12 Medalhas no Troféu Brasil",
      excerpt: "Atletas se destacaram nas provas de nado livre, borboleta e medley, estabelecendo novas marcas estaduais.",
      tag: "Natação",
      time: "Há 4 horas",
      image: "/images/sports_swimming.png"
    },
    {
      title: "Atletas do SENAI Quebram Recordes Estaduais nos 100m Rasos",
      excerpt: "Desempenho de alto nível garante vaga direta no Campeonato Nacional de Atletismo Juvenil deste ano.",
      tag: "Atletismo",
      time: "Há 6 horas",
      image: "/images/hero_news.png"
    },
    {
      title: "Liga Interescolar de Basquete Começa na Próxima Semana com 16 Equipes",
      excerpt: "Tabela oficial de jogos foi divulgada hoje com grandes clássicos regionais marcados logo para a rodada de abertura.",
      tag: "Basquete",
      time: "Ontem",
      image: "/images/education_news.png"
    },
    {
      title: "Judoca da Delegação do SESI Conquista a Medalha de Ouro no Sul-Americano",
      excerpt: "Com um ippon espetacular na luta final, atleta comemora a conquista do inédito título continental em Santiago.",
      tag: "Artes Marciais",
      time: "Ontem",
      image: "/images/tech_news.png"
    },
    {
      title: "Vôlei Feminino: Equipe do SESI Avança para os Playoffs Sem Perder Sets",
      excerpt: "Com defesa sólida e ataques potentes pelas pontas, o time mantém 100% de aproveitamento na fase classificatória.",
      tag: "Vôlei",
      time: "Há 2 dias",
      image: "/images/sports_hero.png"
    },
    {
      title: "Ciclismo de Pista: Jovens Promessas Dominam Etapa do Circuito Paulista",
      excerpt: "Ciclistas alcançam velocidades superiores a 60 km/h no velódromo municipal e garantem pódio completo.",
      tag: "Ciclismo",
      time: "Há 2 dias",
      image: "/images/sports_futsal.png"
    },
    {
      title: "Maratona Aquática Estudantil Desafia Atletas em Percurso de 5km no Mar",
      excerpt: "Mais de 200 nadadores encararam as ondas e correntes em uma prova emocionante de resistência física.",
      tag: "Natação de Mar",
      time: "Há 3 dias",
      image: "/images/sports_swimming.png"
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
            <span style={{ color: "var(--accent-blue)" }}>Esportes</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Sesi News Esportes</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Acompanhe a cobertura completa de campeonatos, e-sports, placares ao vivo e bastidores do esporte.
          </p>
        </section>

        {/* Live Score Ticker */}
        <div className="score-ticker">
          {matches.map((m, idx) => (
            <div key={idx} className="score-card">
              <span className="score-league">{m.league}</span>
              <div className="score-teams">
                <span>{m.teamA} {m.scoreA}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>vs</span>
                <span>{m.scoreB} {m.teamB}</span>
              </div>
              <span className={`score-time ${m.live ? "badge-red" : ""}`} style={{ fontSize: "0.7rem", display: "inline-block" }}>
                {m.live ? "🔴 " : ""}{m.status}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Hero Sports Story */}
        <div className="hero-main" style={{ backgroundImage: `url('/images/sports_hero.png')`, marginBottom: "3rem", minHeight: "380px" }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="badge badge-blue">Destaque de Esportes</span>
            <h2 className="hero-title">
              Grande Final do Campeonato Estudantil Registra Recorde Histórico de Público
            </h2>
            <p className="hero-excerpt">
              Em uma noite épica no estádio lotado, a final foi decidida nos minutos adicionais com gol espetacular de fora da área.
            </p>
            <div className="hero-meta">
              <span>Por André Silva (Editoria de Esportes)</span>
              <span>•</span>
              <span>13 de Agosto, 2026</span>
            </div>
          </div>
        </div>

        {/* Sports News Grid */}
        <section>
          <div className="section-header">
            <h2 className="section-title">Todas as Notícias de Esportes ({articles.length})</h2>
          </div>

          <div className="news-grid">
            {articles.map((item, idx) => (
              <article key={idx} className="news-card">
                <div className="card-image-wrapper">
                  <span className="card-badge badge badge-blue">{item.tag}</span>
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