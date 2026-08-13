"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Categorias", href: "/categorias" },
  ];

  return (
    <>
      {/* Ticker Bar */}
      <div className="ticker-bar">
        <div className="ticker-inner">
          <span className="ticker-label">⚡ Última Hora</span>
          <span className="ticker-text">
            SENAI abre inscrições para novos cursos de Inteligência Artificial e Robótica com certificação internacional.
          </span>
        </div>
      </div>

      {/* Header Bar */}
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <Link href="/" className="logo-group">
            <div className="logo-badge">S</div>
            <div className="logo-text">
              SESI<span>NEWS</span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav>
            <ul className="nav-menu">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/" || pathname === "/inicio"
                    : pathname.startsWith("/categorias");

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive ? "active" : ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}