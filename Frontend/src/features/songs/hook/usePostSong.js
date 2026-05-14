import { useContext } from "react"
import { PostSongContext } from "../PostSongContext"
import { postSong } from "../services/song.api"

export const usePostSong = () => {
  const context = useContext(PostSongContext)

  if (!context) {
    throw new Error("usePostSong must be used inside SongContextProvider")
  }

  const {
    loading,
    setLoading,
    error,
    setError
  } = context

  const handlePostSong = async ({ file, mood }) => {
    try {
      setLoading(true)
      setError(null)

      const data = await postSong(file, mood)

      return data
    } catch (err) {
      console.log(err)
      setError(err?.response?.data?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return {
    handlePostSong,
    loading,
    error
  }
}