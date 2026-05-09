import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { LoginUser, LogoutUser, RegisterUser } from './services/auth.api'





export const AuthContext = createContext()

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleLogin(identifier, password) {
        try {

            setLoading(true)

            const data = await LoginUser(identifier, password)

            setUser(data.user)

        } catch (err) {

            console.log(err)

        } finally {

            setLoading(false)

        }
    }

    async function handleRegister(email, username, password) {
        try {
            setLoading(true)
            const data = await RegisterUser(email, username, password)
            setUser(data.user)
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        try {
            setLoading(true)
            await LogoutUser()
            setUser(null)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }




    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleRegister }}>
            {children}
        </AuthContext.Provider>
    )
}

