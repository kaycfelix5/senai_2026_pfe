'use client';

import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.badge}>
        <span className={styles.badgeDot}></span>
        ViaCEP Consulta
      </div>
      <h1 className={styles.title}>Buscar Endereço por CEP</h1>
      <p className={styles.subtitle}>
        Consulte informações completas de logradouro, bairro, cidade e estado em tempo real.
      </p>
    </header>
  );
}