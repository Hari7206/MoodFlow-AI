import React, { createContext, useState } from "react"

export const AdminContext = createContext()

export const AdminContextProvider = ({ children }) => {

  const [pendingSongs, setPendingSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedSong, setSelectedSong] = useState(null)

  return (
    <AdminContext.Provider
      value={{
        pendingSongs,
        setPendingSongs,
        loading,
        setLoading,
        selectedSong,
        setSelectedSong
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}