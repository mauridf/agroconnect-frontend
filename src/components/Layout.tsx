import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  const location = useLocation()
  const hideSidebar = location.pathname === '/'

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <main style={{
        flex: 1,
        padding: '2rem',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #f0fff4, #e6fffa)'
      }}>
        <Outlet />
      </main>
    </div>
  )
}
