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
import PostSong from './features/songs/page/PostSong'
import About from './features/home/pages/About'
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
   <Route path="/uploadSong" element={<PostSong />} />
   <Route path="/about" element={<About />} />

</Routes>
   </BrowserRouter>

  )
}

export default Approutes