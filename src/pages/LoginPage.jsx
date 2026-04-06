import { useState } from 'react'
import Header from '../components/layout/Header'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      if (mode === 'register') {
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
        setMessage('Conta criada com sucesso. Verifique seu e-mail, se necessário.')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        setMessage('Login realizado com sucesso.')
      }
    } catch (error) {
      setMessage(error.message || 'Não foi possível continuar.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true)
    setMessage('')

    try {
      const { error } = await signInWithGoogle()
      if (error) throw error
    } catch (error) {
      setMessage(error.message || 'Erro ao entrar com Google.')
      setSubmitting(false)
    }
  }

  return (
    <div className="site-shell">
      <Header />

      <main className="auth-luxury-page">
        <section className="auth-luxury-layout">
          <div className="auth-luxury-visual">
            <div className="auth-luxury-visual__content">
              <span className="section-head-luxury__eyebrow">Alpha Imports</span>
              <h1>{mode === 'login' ? 'ACESSE SUA CONTA' : 'CRIE SUA CONTA'}</h1>
              <p>
                Entre com e-mail e senha ou use o Google para acessar de forma mais
                rápida e elegante.
              </p>
            </div>
          </div>

          <div className="auth-luxury-form-wrap">
            <form className="auth-luxury-form" onSubmit={handleSubmit}>
              <h2>{mode === 'login' ? 'Entrar' : 'Cadastrar'}</h2>

              {mode === 'register' ? (
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              ) : null}

              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="luxury-button luxury-button--dark"
                disabled={submitting}
              >
                {submitting
                  ? 'Processando...'
                  : mode === 'login'
                  ? 'Entrar'
                  : 'Criar conta'}
              </button>

              <button
                type="button"
                className="luxury-button luxury-button--light"
                onClick={handleGoogleLogin}
                disabled={submitting}
              >
                Entrar com Google
              </button>

              <button
                type="button"
                className="auth-luxury-form__switch"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              >
                {mode === 'login'
                  ? 'Ainda não tem conta? Criar agora'
                  : 'Já tem conta? Entrar'}
              </button>

              {message ? <p className="auth-luxury-form__message">{message}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}