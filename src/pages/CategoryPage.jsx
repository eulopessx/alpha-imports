import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'
import { categories, products } from '../data/mockData'

export default function CategoryPage() {
  const { slug } = useParams()
  const [selectedSize, setSelectedSize] = useState('Todos')
  const [selectedOrder, setSelectedOrder] = useState('relevancia')

  const category = categories.find((item) => item.slug === slug) ?? {
    name: 'Coleção',
    subtitle: 'Seleção refinada Alpha Imports',
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedOrder === 'menor-preco') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    }

    if (selectedOrder === 'maior-preco') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    }

    return result
  }, [selectedOrder])

  return (
    <div className="site-shell">
      <Header />

      <main className="category-luxury-page">
        <section className="category-luxury-page__hero">
          <div className="category-luxury-page__hero-left">
            <span className="category-luxury-page__eyebrow">Alpha Imports</span>
            <h1>{category.name}</h1>
            <p>{category.subtitle}</p>
          </div>

          <div className="category-luxury-page__hero-right">
            <nav className="category-luxury-page__breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{category.name}</span>
            </nav>
          </div>
        </section>

        <section className="category-luxury-layout">
          <aside className="category-luxury-sidebar">
            <div className="category-luxury-sidebar__block">
              <h3>Categorias</h3>
              <div className="category-luxury-sidebar__list">
                {categories.map((item) => (
                  <Link
                    key={item.id}
                    to={`/categoria/${item.slug}`}
                    className={item.slug === slug ? 'is-active' : ''}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="category-luxury-sidebar__block">
              <h3>Tamanhos</h3>
              <div className="category-luxury-sidebar__chips">
                {['Todos', 'P', 'M', 'G', 'GG'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? 'is-active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="category-luxury-sidebar__block">
              <h3>Ordenar</h3>
              <div className="category-luxury-sidebar__list">
                <button
                  type="button"
                  className={selectedOrder === 'relevancia' ? 'is-active' : ''}
                  onClick={() => setSelectedOrder('relevancia')}
                >
                  Relevância
                </button>
                <button
                  type="button"
                  className={selectedOrder === 'menor-preco' ? 'is-active' : ''}
                  onClick={() => setSelectedOrder('menor-preco')}
                >
                  Menor preço
                </button>
                <button
                  type="button"
                  className={selectedOrder === 'maior-preco' ? 'is-active' : ''}
                  onClick={() => setSelectedOrder('maior-preco')}
                >
                  Maior preço
                </button>
              </div>
            </div>
          </aside>

          <section className="category-luxury-products">
            <div className="category-luxury-products__top">
              <div>
                <span className="category-luxury-products__label">Coleção</span>
                <h2>{category.name}</h2>
              </div>

              <p>{filteredProducts.length} produtos</p>
            </div>

            <div className="category-luxury-products__grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}

function parsePrice(price) {
  return Number(price.replace('R$', '').replace(/\./g, '').replace(',', '.').trim())
}