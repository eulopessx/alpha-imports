import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product-card-luxury">
      <Link to={`/produto/${product.slug}`} className="product-card-luxury__link">
        <div className="product-card-luxury__image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-card-luxury__image"
          />
        </div>

        <div className="product-card-luxury__content">
          <h3 className="product-card-luxury__title">{product.name}</h3>
          <p className="product-card-luxury__price">{product.price}</p>
        </div>
      </Link>
    </article>
  )
}