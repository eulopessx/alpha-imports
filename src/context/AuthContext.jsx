import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../config/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function bootstrap() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      setSession(session ?? null)
      setUser(session?.user ?? null)

      if (session?.user) {
        await ensureProfile(session.user)
        await loadProfile(session.user.id)
      }

      setLoading(false)
    }

    bootstrap()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session ?? null)
      setUser(session?.user ?? null)

      if (session?.user) {
        await ensureProfile(session.user)
        await loadProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function ensureProfile(authUser) {
    const fullName =
      authUser.user_metadata?.full_name ||
      authUser.user_metadata?.name ||
      authUser.email?.split('@')[0] ||
      ''

    const avatarUrl = authUser.user_metadata?.avatar_url || null

    await supabase.from('profiles').upsert(
      {
        id: authUser.id,
        email: authUser.email,
        full_name: fullName,
        avatar_url: avatarUrl,
      },
      { onConflict: 'id' }
    )
  }

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!error) setProfile(data)
  }

  async function signUp(email, password, fullName) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
  }

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  async function signOut() {
    const result = await supabase.auth.signOut()
    setProfile(null)
    return result
  }

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      isAuthenticated: !!user,
      isAdmin: profile?.role === 'admin',
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      refreshProfile: () => (user ? loadProfile(user.id) : null),
    }),
    [session, user, profile, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}