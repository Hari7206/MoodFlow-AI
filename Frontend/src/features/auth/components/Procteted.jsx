import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

function Procteted({ children }) {

    const { user, loading } = useAuth()


    if (loading) {
        return <h1>Loading</h1>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Procteted