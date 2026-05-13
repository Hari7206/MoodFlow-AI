import React, { useRef, useState, useEffect } from "react"
import { useSong } from "../Hooks/useSong"
import "./player.scss"

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

const Player = () => {
  const {
    song,
    isPlaying,
    setIsPlaying,
    handleAddRecent,
    handleGetPlaylist,
    playlist,
    setSong
  } = useSong()

  const audioRef = useRef(null)
  const progressRef = useRef(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!song?.url) return

    const audio = audioRef.current
    if (!audio) return

    audio.load()
    setCurrentTime(0)
    setIsPlaying(false)

    if (song?.mood) {
      handleGetPlaylist(song.mood)
    }
  }, [song])

  const playSong = (track) => {
    setSong(track)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      await audio.play()
      setIsPlaying(true)

      if (song?._id) {
        handleAddRecent(song._id)
      }
    }
  }

  const skip = (secs) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration
    )
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    const bar = progressRef.current
    if (!audio || !bar) return

    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)

    if (audioRef.current) {
      audioRef.current.volume = val
    }

    setIsMuted(val === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  if (!song) return null

  return (
    <div className="music-app">

      <div className="player">
        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="player__info">
          <img src={song.posterUrl} className="player__poster" />
          <div>
            <h3>{song.title}</h3>
            <p>{song.mood}</p>
          </div>
        </div>

        <div className="player__progress">
          <span>{formatTime(currentTime)}</span>

          <div
            ref={progressRef}
            className="bar"
            onClick={handleProgressClick}
          >
            <div
              className="fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span>{formatTime(duration)}</span>
        </div>

        <div className="player__controls">
          <button onClick={() => skip(-5)}>⏪</button>
          <button onClick={togglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={() => skip(5)}>⏩</button>

          <button onClick={toggleMute}>
            {isMuted ? "Muted" : "Vol"}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
          />
        </div>
      </div>

      <div className="playlist">
        <h2>Playlist</h2>

        {playlist?.length ? (
          playlist.map((item) => (
            <div
              key={item._id}
              className="playlist__item"
              onClick={() => playSong(item)}
            >
              <img src={item.posterUrl} />
              <div>
                <p>{item.title}</p>
                <span>{item.mood}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty">No playlist found</p>
        )}
      </div>

    </div>
  )
}

export default Player