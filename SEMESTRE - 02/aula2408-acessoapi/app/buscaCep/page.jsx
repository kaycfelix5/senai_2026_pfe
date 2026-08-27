'use client';

import { useState } from 'react';
import Header from '../components/header';
import styles from './buscaCep.module.css';

export default function BuscaCep() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [copiado, setCopiado] = useState(false);

  // Formata o CEP digitado (adiciona hífen automaticamente)
  const handleCepChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 8) {
      if (rawValue.length > 5) {
        setCep(`${rawValue.slice(0, 5)}-${rawValue.slice(5)}`);
      } else {
        setCep(rawValue);
      }
    }
  };

  const handleSearch = async (cepParaBuscar) => {
    const termo = (cepParaBuscar || cep).replace(/\D/g, '');

    if (!termo || termo.length !== 8) {
      setErro('Por favor, informe um CEP válido com 8 dígitos.');
      setEndereco(null);
      return;
    }

    setLoading(true);
    setErro('');
    setEndereco(null);

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${termo}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErro('CEP não encontrado. Verifique os números e tente novamente.');
        setEndereco(null);
      } else {
        setEndereco(dados);
      }
    } catch (e) {
      setErro('Erro ao conectar ao serviço ViaCEP. Tente novamente mais tarde.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuickSearch = (quickCep) => {
    setCep(quickCep);
    handleSearch(quickCep);
  };

  const handleCopy = () => {
    if (!endereco) return;
    const texto = `${endereco.logradouro || ''}, ${endereco.bairro || ''}, ${endereco.localidade || ''} - ${endereco.uf || ''}, CEP: ${endereco.cep || ''}`;
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const mapsUrl = endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${endereco.logradouro || ''}, ${endereco.bairro || ''}, ${endereco.localidade || ''} - ${endereco.uf || ''}`
      )}`
    : '#';

  return (
    <main className={styles.container}>
      <Header />

      <section className={styles.searchCard}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>

            <input
              type="text"
              className={styles.input}
              value={cep}
              onChange={handleCepChange}
              onKeyDown={handleKeyDown}
              placeholder="00000-000"
              maxLength={9}
              autoFocus
            />

            {cep && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => {
                  setCep('');
                  setEndereco(null);
                  setErro('');
                }}
                title="Limpar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.searchButton}
            onClick={() => handleSearch()}
            disabled={loading || !cep}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Buscando...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Buscar
              </>
            )}
          </button>
        </div>

        <div className={styles.quickTags}>
          <span className={styles.quickLabel}>Sugestões rápidas:</span>
          <button
            type="button"
            className={styles.tag}
            onClick={() => handleQuickSearch('01310-100')}
          >
            Av. Paulista (SP)
          </button>
          <button
            type="button"
            className={styles.tag}
            onClick={() => handleQuickSearch('20040-002')}
            >
            Centro (RJ)
          </button>
          <button
            type="button"
            className={styles.tag}
            onClick={() => handleQuickSearch('70040-010')}
          >
            Esplanada (DF)
          </button>
        </div>
      </section>

      {erro && (
        <div className={styles.errorBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{erro}</span>
        </div>
      )}

      {endereco && (
        <section className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div className={styles.resultTitleArea}>
              <span className={styles.resultCepBadge}>{endereco.cep}</span>
              <span className={styles.resultState}>
                {endereco.localidade} - {endereco.uf}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={handleCopy}
                title="Copiar endereço completo"
              >
                {copiado ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copiar
                  </>
                )}
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                title="Ver no Google Maps"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                Mapa
              </a>
            </div>
          </div>

          <div className={styles.gridInfo}>
            <div className={`${styles.infoItem} ${styles.infoItemFull}`}>
              <span className={styles.infoLabel}>Logradouro / Rua</span>
              <span className={styles.infoValue}>
                {endereco.logradouro || 'Não informado'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Bairro</span>
              <span className={styles.infoValue}>
                {endereco.bairro || 'Não informado'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Cidade</span>
              <span className={styles.infoValue}>
                {endereco.localidade || 'Não informado'}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Estado (UF)</span>
              <span className={styles.infoValue}>
                {endereco.uf || 'Não informado'} {endereco.estado ? `(${endereco.estado})` : ''}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>DDD</span>
              <span className={styles.infoValue}>
                {endereco.ddd ? `(${endereco.ddd})` : 'Não informado'}
              </span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
