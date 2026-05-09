import React from 'react'
import FaceExpression from './features/expression/components/FaceExpression'
import { AuthContextProvider } from './features/auth/AuthContextProvider'
import Approutes from './approutes'


function App() {

  return (

<AuthContextProvider>
      <Approutes />
</AuthContextProvider>


  )
}

export default App