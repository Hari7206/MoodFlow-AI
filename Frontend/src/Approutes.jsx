import React from 'react'
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import FaceExpression from './features/expression/components/FaceExpression'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Procteted from './features/auth/components/Procteted'
import Home from './features/home/pages/Home'
import Mood from './features/home/pages/Mood'
import Dashboard from './features/dashboard/pages/Dashboard'
import Admin from './features/admin/pages/Admin'
function Approutes() {
  return (
    // routes
   <BrowserRouter>
    <Routes>
   <Route path="/" element={<Procteted><Home/></Procteted>} />
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Register />} />
   <Route path="/face" element={<Mood />} />
   <Route path="/userDashboard" element={<Dashboard />} />
   <Route path="/admin" element={<Admin />} />
</Routes>
   </BrowserRouter>

  )
}

export default Approutes