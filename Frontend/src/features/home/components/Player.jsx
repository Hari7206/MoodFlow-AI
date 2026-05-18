import React, { useRef, useState, useEffect, useCallback } from "react"
import { useSong } from "../Hooks/useSong"
import "./Player.scss"

const SkipBackLg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <text x="9.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">10</text>
  </svg>
)

const SkipFwdLg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <text x="14.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">10</text>
  </svg>
)

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6,3 20,12 6,21"/>
  </svg>
)

const PauseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1"/>
    <rect x="15" y="3" width="4" height="18" rx="1"/>
  </svg>
)

const VolumeHigh = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
)

const VolumeLow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)

const VolumeMute = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)

const ShuffleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
)

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00"
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, "0")
  return `${m}:${sec}`
}

const Player = () => {
  const {
    song,
    isPlaying,
    setIsPlaying,
    handleAddRecent,
    handleGetPlaylist,
    playlist,
    setSong,
  } = useSong()

  const mainAudio   = useRef(null)
  const mainBarRef  = useRef(null)
  const shouldAutoPlay = useRef(false)

  const [mainTime,   setMainTime]   = useState(0)
  const [mainDur,    setMainDur]    = useState(0)
  const [mainVol,    setMainVol]    = useState(1)
  const [mainMuted,  setMainMuted]  = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  
  useEffect(() => {
    if (!song?.url) return
    const a = mainAudio.current
    if (!a) return
    a.load()
    setMainTime(0)
    setIsPlaying(false)
    if (song?.mood) handleGetPlaylist(song.mood)

    if (shouldAutoPlay.current) {
      shouldAutoPlay.current = false
      const playWhenReady = () => {
        a.play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
        a.removeEventListener("canplay", playWhenReady)
      }
      a.addEventListener("canplay", playWhenReady)
    }
  }, [song])

  const mainToggle = async () => {
    const a = mainAudio.current
    if (!a) return
    if (isPlaying) {
      a.pause()
      setIsPlaying(false)
    } else {
      await a.play()
      setIsPlaying(true)
      if (song?._id) handleAddRecent(song._id)
    }
  }

  const mainSkip = (s) => {
    const a = mainAudio.current
    if (!a) return
    a.currentTime = Math.min(Math.max(a.currentTime + s, 0), mainDur)
  }

  const mainProgressClick = (e) => {
    const a = mainAudio.current
    const bar = mainBarRef.current
    if (!a || !bar) return
    const r = bar.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * mainDur
  }


  const handleSongEnd = useCallback(() => {
    if (!playlist?.length) return
    const currentIndex = playlist.findIndex((item) => item._id === song?._id)
    let nextIndex
    if (isShuffled) {
    
      do {
        nextIndex = Math.floor(Math.random() * playlist.length)
      } while (playlist.length > 1 && nextIndex === currentIndex)
    } else {
      nextIndex = (currentIndex + 1) % playlist.length
    }
    shouldAutoPlay.current = true
    setSong(playlist[nextIndex])
  }, [playlist, song, isShuffled, setSong])

  const selectPlaylistSong = (item) => {
    setSong(item)
  }

  const mainProg = mainDur ? (mainTime / mainDur) * 100 : 0

  if (!song) return null

  return (
    <>
      <audio
        ref={mainAudio}
        src={song?.url}
        onTimeUpdate={() => setMainTime(mainAudio.current?.currentTime || 0)}
        onLoadedMetadata={() => setMainDur(mainAudio.current?.duration || 0)}
        onEnded={handleSongEnd}
      />

      <div className="ma">
        <div className="mp">
          <div className="mp__ambient" style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(255,75,43,0.12) 0%, transparent 65%)`
          }} />

      
          <div className="mp__art-zone">
            <div className="mp__art-frame">
              <div className={`mp__ring${isPlaying ? "" : " paused"}`} />

              {song.posterUrl ? (
                <img
                  src={song.posterUrl}
                  className={`mp__cover${isPlaying ? " spinning" : ""}`}
                  alt={song.title}
                />
              ) : (
                <div className="mp__cover-placeholder">🎵</div>
              )}

              <div className="mp__vinyl-hole" />

              <div className={`mp__playing-badge${isPlaying ? " visible" : ""}`}>
                Now Playing
              </div>
            </div>
          </div>

          <div className="mp__meta">
            <div className="mp__title">{song.title}</div>
            {song.mood && <div className="mp__mood">{song.mood}</div>}
          </div>

          <div className="mp__progress">
            <div className="mp__bar" ref={mainBarRef} onClick={mainProgressClick}>
              <div className="mp__bar-fill" style={{ width: `${mainProg}%` }} />
            </div>
            <div className="mp__times">
              <span>{fmt(mainTime)}</span>
              <span>{fmt(mainDur)}</span>
            </div>
          </div>

 
          <div className="mp__controls">
            <button
              className={`ic-btn ic-btn--sm ic-btn--shuffle${isShuffled ? " active" : ""}`}
              onClick={() => setIsShuffled((s) => !s)}
              title="Shuffle"
            >
              <ShuffleIcon />
            </button>

            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(-10)} title="Back 10s">
              <SkipBackLg />
            </button>

            <button className="ic-btn ic-btn--main" onClick={mainToggle}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(10)} title="Fwd 10s">
              <SkipFwdLg />
            </button>

     
            <div style={{ width: 40 }} />
          </div>

          <div className="mp__volume">
            <button className="mp__vol-icon" onClick={() => {
              const a = mainAudio.current
              if (!a) return
              if (mainMuted) {
                a.volume = mainVol
                setMainMuted(false)
              } else {
                a.volume = 0
                setMainMuted(true)
              }
            }}>
              {mainMuted ? <VolumeMute /> : mainVol > 0.5 ? <VolumeHigh /> : <VolumeLow />}
            </button>
            <input
              type="range" min="0" max="1" step="0.02"
              className="mp__vol-slider"
              value={mainMuted ? 0 : mainVol}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                setMainVol(v)
                if (mainAudio.current) mainAudio.current.volume = v
                setMainMuted(v === 0)
              }}
            />
          </div>
        </div>

        <div className="pl">
          <div className="pl__header">
            <div className="pl__title">Playlist</div>
            <div className="pl__subtitle">
              {song.mood ? `Mood · ${song.mood}` : "Based on your track"} · {playlist?.length ?? 0} tracks
            </div>
          </div>

          <div className="pl__list">
            {!playlist?.length ? (
              <div className="pl__empty">No tracks found<br />for this mood</div>
            ) : (
              playlist.map((item, idx) => {
                const isActive = song?._id === item._id
                return (
                  <div
                    key={item._id}
                    className={`pl__item${isActive ? " active" : ""}`}
                    onClick={() => selectPlaylistSong(item)}
                  >
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        className={`pl__item-img${isActive && isPlaying ? " spinning" : ""}`}
                        alt={item.title}
                      />
                    ) : (
                      <div className="pl__item-img-ph">🎵</div>
                    )}
                    <div className="pl__item-info">
                      <div className="pl__item-title">{item.title}</div>
                      <div className="pl__item-mood">{item.mood}</div>
                    </div>

                    {isActive ? (
                      <div className="pl__wave">
                        {[0, 1, 2, 3].map(i => (
                          <div
                            key={i}
                            className={`pl__wave-bar${isPlaying ? "" : " paused"}`}
                            style={{ animationDelay: `${i * 0.12}s` }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="pl__item-num">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Player