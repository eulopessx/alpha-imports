import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header-luxury">
      <div className="header-luxury__topline" />

      <div className="header-luxury__inner">
        <div className="header-luxury__mobile-top">
          <Link to="/" className="header-luxury__logo">
            ALPHA IMPORTS
          </Link>

          <div className="header-luxury__mobile-actions">
            <Link to="/login">Entrar</Link>
            <Link to="/carrinho">Carrinho</Link>
          </div>
        </div>

        <nav className="header-luxury__left">
          <Link to="/categoria/streetwear">Novidades</Link>
          <Link to="/categoria/streetwear">Masculino</Link>
          <Link to="/categoria/sport">Sport</Link>
        </nav>

        <Link to="/" className="header-luxury__logo header-luxury__logo--desktop">
          ALPHA IMPORTS
        </Link>

        <nav className="header-luxury__right">
          <Link to="/login">Entrar</Link>
          <Link to="/perfil">Conta</Link>
          <Link to="/carrinho">Carrinho</Link>
        </nav>
      </div>
    </header>
  )
}