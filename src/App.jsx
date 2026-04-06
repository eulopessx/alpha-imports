import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categoria/:slug" element={<CategoryPage />} />
      <Route path="/produto/:slug" element={<ProductPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminDashboardPage />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  )
}