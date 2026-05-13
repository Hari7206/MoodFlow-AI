import React from 'react'
import FaceExpression from './features/expression/components/FaceExpression'
import { AuthContextProvider } from './features/auth/AuthContextProvider'
import Approutes from './approutes'
import { SongContextProvider } from './features/home/SongContext'
import { DashboardContextProvider } from './features/dashboard/DashboardContext'
import { AdminContextProvider } from './features/admin/adminContextProvider'


function App() {

  return (
    <AuthContextProvider>


      <SongContextProvider>
        <DashboardContextProvider>

          <AdminContextProvider>
            <Approutes />
          </AdminContextProvider>
        </DashboardContextProvider>
      </SongContextProvider>

    </AuthContextProvider>


  )
}

export default App