import { Routes, Route, Navigate } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Insight } from './pages/Insight'
import { Login } from './pages/Login'
import { DefaultLayoutSign } from './layouts/DefaultLayoutSign'
import { Register } from './pages/Register'
import { useAuth } from './contexts/AuthContext'

export function Router() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={<DefaultLayoutSign />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/register" element={<DefaultLayoutSign />}>
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/" element={<DefaultLayout />}>
      <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/insight" element={isAuthenticated ? <Insight /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}