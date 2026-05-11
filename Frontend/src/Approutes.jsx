import React from 'react'
import {Routes , Route , BrowserRouter} from 'react-router-dom'
import FaceExpression from './features/expression/components/FaceExpression'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
function Approutes() {
  return (
    // routes
   <BrowserRouter>
    <Routes>
   <Route path="/" element={<h1>Hey there</h1>} />
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Register />} />
   <Route path="/face" element={<FaceExpression />} />

</Routes>
   </BrowserRouter>
  )
}

export default Approutes