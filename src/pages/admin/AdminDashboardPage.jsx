import Header from '../../components/layout/Header'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Pedidos hoje', value: '18' },
    { label: 'Faturamento', value: 'R$ 4.890' },
    { label: 'Clientes', value: '126' },
    { label: 'Produtos', value: '48' },
  ]

  return (
    <div className="site-shell">
      <Header />

      <main className="admin-luxury-page">
        <section className="admin-luxury-head">
          <span className="section-head-luxury__eyebrow">Painel Admin</span>
          <h1>Controle da Loja</h1>
          <p>Gerencie catálogo, pedidos, clientes e aparência do site.</p>
        </section>

        <section className="admin-luxury-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="admin-luxury-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="admin-luxury-panels">
          <div className="admin-luxury-panel">
            <h2>Ações rápidas</h2>
            <div className="admin-luxury-actions">
              <button type="button">Novo produto</button>
              <button type="button">Novo banner</button>
              <button type="button">Ver pedidos</button>
              <button type="button">Editar home</button>
            </div>
          </div>

          <div className="admin-luxury-panel">
            <h2>Resumo operacional</h2>
            <p>
              Aqui ficará a base para produtos, pedidos, clientes, aparência e
              personalização completa da Alpha Imports.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}