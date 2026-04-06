import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import { products } from '../data/mockData'

export default function CartPage() {
  const cartItems = [
    { ...products[0], quantity: 1, size: 'M' },
    { ...products[1], quantity: 2, size: 'G' },
  ]

  const subtotal = 519.7
  const shipping = 29.9
  const total = subtotal + shipping

  return (
    <div className="site-shell">
      <Header />

      <main className="cart-luxury-page">
        <section className="cart-luxury-page__head">
          <span className="section-head-luxury__eyebrow">Alpha Imports</span>
          <h1>Seu Carrinho</h1>
          <p>Revise os produtos selecionados antes de avançar para o checkout.</p>
        </section>

        <section className="cart-luxury-layout">
          <div className="cart-luxury-items">
            {cartItems.map((item) => (
              <article key={`${item.id}-${item.size}`} className="cart-luxury-item">
                <div className="cart-luxury-item__image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-luxury-item__content">
                  <h2>{item.name}</h2>
                  <p>Tamanho: {item.size}</p>
                  <p>Quantidade: {item.quantity}</p>
                  <button type="button">Remover</button>
                </div>

                <div className="cart-luxury-item__price">{item.price}</div>
              </article>
            ))}
          </div>

          <aside className="cart-luxury-summary">
            <h3>Resumo do pedido</h3>

            <div className="cart-luxury-summary__row">
              <span>Subtotal</span>
              <strong>R$ {subtotal.toFixed(2).replace('.', ',')}</strong>
            </div>

            <div className="cart-luxury-summary__row">
              <span>Frete</span>
              <strong>R$ {shipping.toFixed(2).replace('.', ',')}</strong>
            </div>

            <div className="cart-luxury-summary__row cart-luxury-summary__row--total">
              <span>Total</span>
              <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>

            <Link to="/checkout" className="luxury-button luxury-button--dark">
              Ir para checkout
            </Link>

            <Link to="/categoria/streetwear" className="luxury-button luxury-button--light">
              Continuar comprando
            </Link>
          </aside>
        </section>
      </main>
    </div>
  )
}