import React from 'react'
import FaceExpression from './features/expression/components/FaceExpression'
import { AuthContextProvider } from './features/auth/AuthContextProvider'
import Approutes from './approutes'
import { SongContextProvider } from './features/home/SongContext'
import { DashboardContextProvider } from './features/dashboard/DashboardContext'
import { AdminContextProvider } from './features/admin/adminContextProvider'
import PostSongContextProvider from './features/songs/PostSongContext'


function App() {

  return (
    <AuthContextProvider>


      <SongContextProvider>
        <DashboardContextProvider>
          <AdminContextProvider>
          <PostSongContextProvider>
            <Approutes />
          </PostSongContextProvider>
          
          </AdminContextProvider>
        </DashboardContextProvider>
      </SongContextProvider>

    </AuthContextProvider>


  )
}

export default App