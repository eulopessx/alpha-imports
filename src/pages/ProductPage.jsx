import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/mockData'

export default function ProductPage() {
  const { slug } = useParams()

  const product = products.find((item) => item.slug === slug) ?? products[0]
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')

  const relatedProducts = useMemo(() => {
    return products
      .filter((item) => item.category === product.category && item.slug !== product.slug)
      .slice(0, 4)
  }, [product])

  return (
    <div className="site-shell">
      <Header />

      <main className="product-luxury-page">
        <section className="product-luxury-page__breadcrumb-wrap">
          <nav className="product-luxury-page__breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/categoria/${product.category}`}>{product.category}</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
        </section>

        <section className="product-luxury-layout">
          <div className="product-luxury-gallery">
            <div className="product-luxury-gallery__thumbs">
              {(product.gallery || [product.image]).map((image) => (
                <button
                  key={image}
                  type="button"
                  className={`product-luxury-gallery__thumb ${
                    selectedImage === image ? 'is-active' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image} alt={product.name} />
                </button>
              ))}
            </div>

            <div className="product-luxury-gallery__main">
              <img src={selectedImage} alt={product.name} />
            </div>
          </div>

          <div className="product-luxury-info">
            <span className="product-luxury-info__eyebrow">Alpha Imports</span>

            <h1>{product.name}</h1>

            <p className="product-luxury-info__price">{product.price}</p>

            <p className="product-luxury-info__description">{product.description}</p>

            <div className="product-luxury-info__sizes">
              <div className="product-luxury-info__label-row">
                <span>Tamanho</span>
                <span>Selecione uma opção</span>
              </div>

              <div className="product-luxury-info__size-grid">
                {product.sizes.map((size) => (
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

            <div className="product-luxury-info__actions">
              <button type="button" className="luxury-button luxury-button--dark">
                Adicionar ao carrinho
              </button>

              <button type="button" className="luxury-button luxury-button--light">
                Comprar agora
              </button>
            </div>

            <div className="product-luxury-info__details">
              <h3>Detalhes do produto</h3>

              <ul>
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="product-luxury-extra">
          <div className="product-luxury-extra__block">
            <span className="product-luxury-extra__eyebrow">Entrega</span>
            <h2>Envio com visual premium e experiência mais refinada.</h2>
          </div>

          <div className="product-luxury-extra__block">
            <span className="product-luxury-extra__eyebrow">Percepção de marca</span>
            <p>
              Cada elemento desta página foi pensado para valorizar o produto com
              mais respiro, elegância e leitura premium tanto no desktop quanto no mobile.
            </p>
          </div>
        </section>

        <section className="product-luxury-related">
          <div className="section-head-luxury">
            <span className="section-head-luxury__eyebrow">Seleção relacionada</span>
            <h2>Você também pode gostar</h2>
            <p>Mais produtos apresentados com a mesma identidade visual sofisticada.</p>
          </div>

          <div className="featured-luxury__grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}