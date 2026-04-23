import React, { useEffect } from 'react';

function AvisoDePagina() {
  // useEffect é um hook que faz algo depois de o componente ser exibido.
  // Ele pode executar ações e também retornar uma função de limpeza.
  useEffect(() => {
    // Passo 1: Ação no efeito (side effect) - muda o título da aba do navegador.
    document.title = 'Página Carregada! ✅';

    // Passo 2: Exemplo de ação - mostra um alerta quando o componente monta.
    alert('Bem-vindo! O useEffect rodou sozinho.');

    // Passo 3: Retorna a função de limpeza (cleanup).
    // Essa função roda quando o componente é desmontado.
    return () => {
      document.title = 'React App';
    };
  }, []); // Lista de dependências vazia => roda uma vez só, quando montar.

  return (
    <div>
      <h1>Olhe para a aba do seu navegador!</h1>
      <p>O título mudou automaticamente via useEffect.</p>
      <p>useEffect é como "escutar" quando o componente aparece e some.</p>
    </div>
  );
}

export default AvisoDePagina;
