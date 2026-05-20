import React, { useRef, useState, useEffect, useCallback } from "react"
import { useSong } from "../Hooks/useSong"
import "./player.scss"

const SkipBackLg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <text x="9.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">10</text>
  </svg>
)
const SkipFwdLg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <text x="14.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">10</text>
  </svg>
)
const PlayIcon  = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg>
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="4" height="18" rx="1"/>
    <rect x="15" y="3" width="4" height="18" rx="1"/>
  </svg>
)
const VolumeHigh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>
)
const VolumeLow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
)
const VolumeMute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)
const ShuffleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
)

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00"
  const m   = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, "0")
  return `${m}:${sec}`
}

const Player = () => {
  const { song, isPlaying, setIsPlaying, handleAddRecent, handleGetPlaylist, playlist, setSong } = useSong()

  const audioRef       = useRef(null)
  const barRef         = useRef(null)
  const shouldAutoPlay = useRef(false)

  const [time,      setTime]      = useState(0)
  const [dur,       setDur]       = useState(0)
  const [vol,       setVol]       = useState(1)
  const [muted,     setMuted]     = useState(false)
  const [shuffled,  setShuffled]  = useState(false)
  const [activeTab, setActiveTab] = useState("UP NEXT")

  useEffect(() => {
    if (!song?.url) return
    const a = audioRef.current
    if (!a) return
    a.load()
    setTime(0)
    setIsPlaying(false)
    if (song?.mood) handleGetPlaylist(song.mood)
    if (shouldAutoPlay.current) {
      shouldAutoPlay.current = false
      const onReady = () => { a.play().then(() => setIsPlaying(true)).catch(() => {}); a.removeEventListener("canplay", onReady) }
      a.addEventListener("canplay", onReady)
    }
  }, [song])

  const toggle = async () => {
    const a = audioRef.current; if (!a) return
    if (isPlaying) { a.pause(); setIsPlaying(false) }
    else { await a.play(); setIsPlaying(true); if (song?._id) handleAddRecent(song._id) }
  }

  const skip = (s) => {
    const a = audioRef.current; if (!a) return
    a.currentTime = Math.min(Math.max(a.currentTime + s, 0), dur)
  }

  const seekClick = (e) => {
    const a = audioRef.current; const bar = barRef.current; if (!a || !bar) return
    const r = bar.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * dur
  }

  const handleSongEnd = useCallback(() => {
    if (!playlist?.length) return
    const ci = playlist.findIndex(i => i._id === song?._id)
    let ni
    if (shuffled) { do { ni = Math.floor(Math.random() * playlist.length) } while (playlist.length > 1 && ni === ci) }
    else { ni = (ci + 1) % playlist.length }
    shouldAutoPlay.current = true
    setSong(playlist[ni])
  }, [playlist, song, shuffled, setSong])

  const prog = dur ? (time / dur) * 100 : 0
  if (!song) return null

  return (
    <>
      <audio
        ref={audioRef}
        src={song?.url}
        onTimeUpdate={() => setTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDur(audioRef.current?.duration || 0)}
        onEnded={handleSongEnd}
      />

      <div className="player-outer-framework">
        
        <div className="player-top-section">
          
          <div className="vinyl-viewport-area">
            <div className={`glow-ambient-background ${isPlaying ? "is-playing" : ""}`} />

            <div className="vinyl-disc-wrapper">
              {song.posterUrl ? (
                <img 
                  src={song.posterUrl} 
                  alt={song.title} 
                  className={`vinyl-cover-art ${isPlaying ? "spin-active" : ""}`}
                />
              ) : (
                <div className="vinyl-fallback-placeholder">🎵</div>
              )}
              <div className="vinyl-center-spindle" />
            </div>
          </div>

          <div className="sidebar-queue-panel">
            <div className="sidebar-tab-navigation">
              {["UP NEXT", "LYRICS", "RELATED"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-trigger-button ${activeTab === tab ? "active-tab" : ""}`}
                >
                  {tab}
                  {activeTab === tab && <div className="active-indicator-bar" />}
                </button>
              ))}
            </div>

            {activeTab === "UP NEXT" ? (
              <div className="queue-scroll-container">
                <div className="pl-scroll-view">
                  {!playlist?.length ? (
                    <div className="empty-state-msg">Queue is empty</div>
                  ) : (
                    playlist.map((item) => (
                      <TrackRow
                        key={item._id}
                        item={item}
                        active={song?._id === item._id}
                        isPlaying={isPlaying}
                        onClick={() => setSong(item)}
                      />
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="sidebar-fallback-view">{activeTab} content empty</div>
            )}
          </div>

        </div>

        <div className="bottom-player-action-bar">
          
          <div ref={barRef} onClick={seekClick} className="timeline-progress-track">
            <div className="timeline-fill-bar" style={{ width: `${prog}%` }} />
          </div>

          <div className="segment-left-controls">
            <button onClick={() => skip(-10)} title="Back 10s" className="skip-btn"><SkipBackLg /></button>
            <button onClick={toggle} className="master-toggle-play-btn">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={() => skip(10)} title="Fwd 10s" className="skip-btn"><SkipFwdLg /></button>
            <span className="time-stamp-display">
              {fmt(time)} / {fmt(dur)}
            </span>
          </div>

          <div className="segment-center-details">
            {song.posterUrl && (
              <img src={song.posterUrl} alt="" className="details-track-poster" />
            )}
            <div className="text-metadata-block">
              <div className="meta-title">{song.title}</div>
              <div className="meta-mood">{song.mood || "Unknown"}</div>
            </div>
          </div>

          <div className="segment-right-utilities">
            <button 
              onClick={() => setShuffled(s => !s)} 
              className="shuffle-toggle-btn"
              style={{ color: shuffled ? "#ff3b30" : "#ffffff", opacity: shuffled ? 1 : 0.6 }}
            >
              <ShuffleIcon />
            </button>
            
            <div className="volume-slider-interface">
              <button
                onClick={() => {
                  const a = audioRef.current; if (!a) return
                  if (muted) { a.volume = vol; setMuted(false) }
                  else { a.volume = 0; setMuted(true) }
                }}
                className="mute-toggle-btn"
              >
                {muted ? <VolumeMute /> : vol > 0.5 ? <VolumeHigh /> : <VolumeLow />}
              </button>
              <input
                type="range" min="0" max="1" step="0.02"
                className="native-vol-slider-element"
                value={muted ? 0 : vol}
                onChange={(e) => {
                  const v = parseFloat(e.target.value)
                  setVol(v)
                  if (audioRef.current) audioRef.current.volume = v
                  setMuted(v === 0)
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

const TrackRow = ({ item, active, isPlaying, onClick }) => {
  return (
    <div className={`track-row-item-container ${active ? "is-active-track" : ""}`} onClick={onClick}>
      <div className="row-poster-thumb-frame">
        {item.posterUrl ? (
          <img src={item.posterUrl} alt="" className="row-poster-image" />
        ) : (
          <div className="row-poster-fallback">🎵</div>
        )}
        {active && (
          <div className="active-row-audio-overlay">
            {isPlaying ? (
              <div className="wave-container">
                <div className="animated-wave-bar" />
                <div className="animated-wave-bar delay-1" />
                <div className="animated-wave-bar delay-2" />
              </div>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 20,12 6,21"/></svg>
            )}
          </div>
        )}
      </div>

      <div className="row-metadata-block">
        <div className={`row-title ${active ? "colored-active-text" : ""}`}>{item.title}</div>
        <div className="row-mood">{item.mood || "Unknown"}</div>
      </div>
    </div>
  )
}

export default Player