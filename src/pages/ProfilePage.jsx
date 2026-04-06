import Header from '../components/layout/Header'

export default function ProfilePage() {
  const orders = [
    { id: 'PED-1001', date: '04/04/2026', status: 'Entregue', total: 'R$ 199,90' },
    { id: 'PED-1002', date: '05/04/2026', status: 'Em separação', total: 'R$ 319,80' },
  ]

  return (
    <div className="site-shell">
      <Header />

      <main className="profile-luxury-page">
        <section className="profile-luxury-head">
          <span className="section-head-luxury__eyebrow">Minha conta</span>
          <h1>Painel do Cliente</h1>
          <p>Visualize seus dados, acompanhe pedidos e gerencie sua experiência.</p>
        </section>

        <section className="profile-luxury-layout">
          <aside className="profile-luxury-sidebar">
            <button type="button" className="is-active">Meus pedidos</button>
            <button type="button">Dados pessoais</button>
            <button type="button">Endereços</button>
            <button type="button">Favoritos</button>
          </aside>

          <div className="profile-luxury-content">
            <div className="profile-luxury-card">
              <h2>Meus pedidos</h2>

              <div className="profile-luxury-table">
                {orders.map((order) => (
                  <div key={order.id} className="profile-luxury-row">
                    <div>
                      <strong>{order.id}</strong>
                      <span>{order.date}</span>
                    </div>

                    <div>
                      <strong>Status</strong>
                      <span>{order.status}</span>
                    </div>

                    <div>
                      <strong>Total</strong>
                      <span>{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}