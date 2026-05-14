import React, { useState } from "react"
import {usePostSong} from "../hook/usePostSong"
import "../style/postSong.scss"

function PostSong() {
  const { handlePostSong, loading, error } = usePostSong()

  const [file, setFile] = useState(null)
  const [mood, setMood] = useState("happy")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) return

    const data = await handlePostSong({
      file,
      mood
    })

    if (data) {
      setSuccess("Song uploaded successfully")
      setFile(null)
    }
  }

  return (
    <div className="post-song">
      <form className="post-song__form" onSubmit={handleSubmit}>
        <h2>Upload Song</h2>

        <div className="post-song__field">
          <label>Choose Song</label>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="post-song__field">
          <label>Select Mood</label>

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="calm">Calm</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Song"}
        </button>

        {success && (
          <p className="success">{success}</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}
      </form>
    </div>
  )
}

export default PostSong