import React, { useState, useEffect } from 'react';

function BuscaDeProdutos() {
  // 1) useState cria o estado local do componente.
  //    'busca' guarda o valor atual do campo.
  //    'setBusca' atualiza esse valor e força re-render.
  const [busca, setBusca] = useState("");

  // 2) useEffect executa um efeito sempre que 'busca' mudar.
  //    Aqui, usamos [busca] como dependência.
  //    Quando o componente renderiza e o valor de busca mudou,
  //    o console mostra "Procurando por...".
  useEffect(() => {
    if (busca !== "") {
      console.log(`Procurando por: ${busca}...`);
      // Neste ponto, você poderia chamar uma API real.
      // Exemplo: fetch(`/produtos?q=${busca}`)
      //  .then(res => res.json())
      //  .then(dados => setProdutos(dados));
    }
  }, [busca]); // [busca] = efeito dispara quando 'busca' muda.

  // 3) A parte visual (JSX): input controlado.
  //    value={busca} garante que o texto mostrado vem do estado.
  //    onChange atualiza o estado quando o usuário digita.
  return (
    <div style={{ padding: '20px' }}>
      <h1>Buscador</h1>
      <input
        type="text"
        placeholder="Digite algo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <p>O console vai avisar toda vez que você digitar.</p>
      <p style={{ color: '#555', marginTop: '10px' }}>
        useEffect aqui age como "quando busca muda, execute essa ação".
      </p>
    </div>
  );
}
