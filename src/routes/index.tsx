import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Layout from '../components/Layout'
import Produtor from '../pages/ProdutorRural'
import ProdutorForm from '../pages/ProdutorForm'
import Fazenda from '../pages/Fazenda'
import FazendaForm from '../pages/FazendaForm'
import Cultura from '../pages/CulturaList'
import CulturaForm from '../pages/CulturaForm'
import FazendaCultura from '../pages/FazendaCultura'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtor" element={<Produtor />} />
        <Route path="/produtor/cadastro" element={<ProdutorForm />} />
        <Route path="/produtor/editar/:id" element={<ProdutorForm />} />
        <Route path="/fazenda" element={<Fazenda />} />
        <Route path="/fazenda/cadastro" element={<FazendaForm />} />
        <Route path="/fazenda/editar/:id" element={<FazendaForm />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/cultura/nova" element={<CulturaForm />} />
        <Route path="/cultura/editar/:id" element={<CulturaForm />} />
        <Route path="/fazendacultura" element={<FazendaCultura />} />
      </Route>
    </Routes>
  )
}
