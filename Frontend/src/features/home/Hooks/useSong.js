import { useContext } from "react"
import { SongContext } from "../SongContext"
import { getSong, getPlaylist, addRecent } from "../service/song.api"

export const useSong = () => {
  const context = useContext(SongContext)

  if (!context) {
    throw new Error("useSong must be used inside SongContextProvider")
  }

const {
  song,
  setSong,
  playlist,
  setPlaylist,
  recent,
  setRecent,
  isPlaying,
  setIsPlaying,
  loading,
  setLoading,
  error,
  setError
} = context

  const handleGetSong = async ({ mood }) => {
    try {
      setLoading(true)
      const data = await getSong({ mood })
      setSong(data.song)
    } catch (err) {
      setError(err?.message || "Error")
    } finally {
      setLoading(false)
    }
  }

  const handleGetPlaylist = async (mood) => {
    try {
      setLoading(true)
      const res = await getPlaylist(mood)

      console.log("PLAYLIST API:", res)

      setPlaylist(res.songs || [])
    } catch (err) {
      setError(err?.message || "Error")
      setPlaylist([])
    } finally {
      setLoading(false)
    }
  }

const handleAddRecent = async (songId) => {
  try {
    const res = await addRecent(songId)
    console.log("RECENT RESPONSE:", res)
  } catch (err) {
    console.log(err)
  }
}

  return {
    song,
    playlist,
    isPlaying,
    setIsPlaying,
    setSong,
    handleGetSong,
    handleGetPlaylist,
    handleAddRecent,
    loading,
    error
  }
}