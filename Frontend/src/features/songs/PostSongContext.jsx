import { createContext, useState } from "react"

export const PostSongContext = createContext()

function PostSongContextProvider({ children }) {
  const [song, setSong] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <PostSongContext.Provider
      value={{
        song,
        setSong,
        playlist,
        setPlaylist,
        recent,
        setRecent,
        loading,
        setLoading,
        error,
        setError,
        isPlaying,
        setIsPlaying
      }}
    >
      {children}
    </PostSongContext.Provider>
  )
}

export default PostSongContextProvider