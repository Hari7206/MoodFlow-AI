import { useContext } from "react"
import { AdminContext } from "../adminContextProvider"
import {getPendingSongs  ,updateSongStatus } from "../services/admin.api"

export const useAdmin = () => {
  const {
    pendingSongs,
    setPendingSongs,
    loading,
    setLoading,
    selectedSong,
    setSelectedSong
  } = useContext(AdminContext)

  async function handleGetPendingSongs() {
    try {
      setLoading(true)
      const data = await getPendingSongs()
      setPendingSongs(data.songs)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateSongStatus(songId, status) {
    try {
      await updateSongStatus(songId, status)

      setPendingSongs((prev) =>
        prev.filter((song) => song._id !== songId)
      )
    } catch (err) {
      console.log(err)
    }
  }

  return {
    pendingSongs,
    loading,
    selectedSong,
    setSelectedSong,
    handleGetPendingSongs,
    handleUpdateSongStatus
  }
}