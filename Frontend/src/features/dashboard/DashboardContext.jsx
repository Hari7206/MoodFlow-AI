import { createContext, useState } from "react"

export const DashboardContext = createContext()

export const DashboardContextProvider = ({ children }) => {

    const [dashboard, setDashboard] = useState(null)

    const [loading, setLoading] = useState(false)

    return (
        <DashboardContext.Provider
            value={{
                dashboard,
                setDashboard,
                loading,
                setLoading
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}