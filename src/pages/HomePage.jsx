import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'
import { categories, products } from '../data/mockData'

export default function HomePage() {
  return (
    <div className="site-shell">
      <Header />

      <main className="home-luxury">
        <section className="hero-luxury">
          <div className="hero-luxury__content">
            <span className="hero-luxury__eyebrow">Alpha Imports</span>

            <h1>
              MODA MASCULINA
              <br />
              COM PRESENÇA,
              <br />
              SILÊNCIO E FORÇA.
            </h1>

            <p>
              Uma experiência sofisticada, limpa e marcante para valorizar a
              marca, o produto e a navegação em qualquer dispositivo.
            </p>

            <div className="hero-luxury__actions">
              <Link to="/categoria/streetwear" className="luxury-button luxury-button--dark">
                Explorar coleção
              </Link>

              <Link to="/categoria/streetwear" className="luxury-button luxury-button--light">
                Ver novidades
              </Link>
            </div>
          </div>

          <div className="hero-luxury__visual">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80"
              alt="Alpha Imports"
            />
          </div>
        </section>

        <section className="intro-luxury">
          <div className="intro-luxury__line" />
          <p>
            Menos ruído visual. Mais elegância, respiro e percepção de valor.
          </p>
        </section>

        <section className="categories-luxury">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${category.slug}`}
              className="category-luxury"
            >
              <span className="category-luxury__name">{category.name}</span>
              <span className="category-luxury__subtitle">{category.subtitle}</span>
            </Link>
          ))}
        </section>

        <section className="featured-luxury">
          <div className="section-head-luxury">
            <span className="section-head-luxury__eyebrow">Seleção Curada</span>
            <h2>Destaques da Temporada</h2>
            <p>
              Produtos apresentados com mais respiro, melhor hierarquia e uma
              leitura premium tanto no desktop quanto no mobile.
            </p>
          </div>

          <div className="featured-luxury__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="statement-luxury">
          <div className="statement-luxury__left">
            <span className="section-head-luxury__eyebrow">Alpha Signature</span>
            <h2>UMA LOJA QUE VALORIZA O PRODUTO ANTES DO EXCESSO.</h2>
          </div>

          <div className="statement-luxury__right">
            <p>
              A proposta é conduzir o cliente com clareza, elegância e sofisticação,
              sem poluição visual e sem uma vitrine cansativa.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}