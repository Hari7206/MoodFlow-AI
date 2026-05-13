import { useContext } from "react"
import { DashboardContext } from "../DashboardContext"
import { getDashboard , updateUser } from "../services/dashboard.api"

export const useDashboard = () => {

    const context = useContext(DashboardContext)
    const { dashboard, setDashboard, loading, setLoading } = context


   async function handleGetDashboard() {
        try {
            setLoading(true)

            const data = await getDashboard()

            setDashboard({
                user: data.user,
                uploads: data.uploads || [],
                recent: data.recent || []
            })

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


  
    async function handleUpdateUser(file, data = {}) {
        try {
            setLoading(true)

            const res = await updateUser(file, data)

     
            await handleGetDashboard()

            return res

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return {
        dashboard,
        loading,
        handleGetDashboard,
        handleUpdateUser
    }
}