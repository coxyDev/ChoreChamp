import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout'
import Dashboard from './pages/Dashboard'
import Children from './pages/children'
import ChildProfile from './pages/childProfile'
import ChoreTemplates from './pages/choreTemplates'
import Settings from './pages/settings'
import Notifications from './pages/notifications'
import Auth from './pages/Auth'

function App() {
  // In a real app, you'd check authentication state here
  const isAuthenticated = true // Placeholder

  if (!isAuthenticated) {
    return <Auth />
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/children" element={<Children />} />
          <Route path="/child-profile" element={<ChildProfile />} />
          <Route path="/chore-templates" element={<ChoreTemplates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App