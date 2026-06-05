import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { LoginUser, LogoutUser, RegisterUser , getMe } from './services/auth.api'





export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
// latest

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

   async function handleLogin(identifier, password) {
    try {
        setLoading(true)
        const data = await LoginUser(identifier, password)
        if (!data || !data.user) return false
        setUser(data.user)
        return true
    } catch (err) {
        console.log(err)
        return false
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


async function handleGetMe() {

    try {

        setLoading(true)

        const data = await getMe()

        if (data) {
            setUser(data.user)
        } else {
            setUser(null)
        }

    } catch (err) {

        setUser(null)
        console.log(err)

    } finally {

        setLoading(false)

    }
}


useEffect(() => {
        handleGetMe()
}, [])


    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleRegister , handleGetMe }}>
            {children}
        </AuthContext.Provider>
    )
}

