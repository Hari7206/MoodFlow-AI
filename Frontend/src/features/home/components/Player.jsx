import React, { useRef, useState, useEffect } from "react"
import { useSong } from "../Hooks/useSong"

/* ─────────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────────── */
const SkipBackLg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <text x="9.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">10</text>
  </svg>
)

const SkipBackSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <text x="9.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">5</text>
  </svg>
)

const SkipFwdSm = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <text x="14.5" y="14.5" fontSize="6.5" fill="currentColor" stroke="none" fontWeight="700" textAnchor="middle">5</text>
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

/* ─────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

:root {
  --bg:        #0c0c0f;
  --panel:     #13131a;
  --surface:   #1a1a24;
  --lift:      #22222e;
  --border:    rgba(255,255,255,0.07);
  --accent:    #ff4b2b;
  --accent2:   #ff416c;
  --grad:      linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%);
  --text:      #f2efea;
  --muted:     rgba(242,239,234,0.38);
  --track-h:   4px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
button { cursor: pointer; font-family: inherit; }
input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; cursor: pointer; }
input[type=range]::-webkit-slider-runnable-track { height: var(--track-h); border-radius: 2px; background: var(--lift); }
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; margin-top: -5px;
  box-shadow: 0 0 8px rgba(255,75,43,0.5);
  transition: transform 0.15s;
}
input[type=range]:hover::-webkit-slider-thumb { transform: scale(1.2); }

/* ── APP SHELL ── */
.ma {
  display: grid;
  grid-template-columns: 1fr 400px;
  height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
}

/* ── LEFT — MAIN PLAYER ── */
.mp {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* ambient bg that shifts to song art colour */
.mp__ambient {
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 0;
  transition: background 1.2s ease;
}

/* art */
.mp__art-zone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 48px 48px 0;
}

.mp__art-frame {
  position: relative;
  width: 280px; height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* spinning outline ring */
.mp__ring {
  position: absolute; inset: -20px;
  border-radius: 50%;
  border: 1.5px dashed rgba(255,75,43,0.28);
  animation: spinRing 18s linear infinite;
}
.mp__ring.paused { animation-play-state: paused; }
@keyframes spinRing { to { transform: rotate(360deg); } }

/* glow dots on ring */
.mp__ring::before, .mp__ring::after {
  content: '';
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px 4px rgba(255,75,43,0.6);
}
.mp__ring::before { top: -4px; left: calc(50% - 4px); }
.mp__ring::after  { bottom: -4px; right: calc(50% - 4px); }

/* ── CIRCULAR SPINNING COVER ── */
.mp__cover {
  width: 280px; height: 280px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  box-shadow:
    0 0 0 6px rgba(255,255,255,0.04),
    0 0 0 12px rgba(255,75,43,0.08),
    0 32px 80px rgba(0,0,0,0.7);
  animation: spinCover 12s linear infinite;
  animation-play-state: paused;
}
.mp__cover.spinning { animation-play-state: running; }

@keyframes spinCover {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.mp__cover-placeholder {
  width: 280px; height: 280px;
  border-radius: 50%;
  background: var(--surface);
  display: grid; place-items: center;
  font-size: 4rem;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
}

/* centre vinyl hole */
.mp__vinyl-hole {
  position: absolute;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--bg);
  border: 3px solid rgba(255,75,43,0.25);
  pointer-events: none;
  z-index: 2;
}

/* playing badge */
.mp__playing-badge {
  position: absolute;
  bottom: -20px; left: 50%;
  transform: translateX(-50%);
  background: var(--grad);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 100px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}
.mp__playing-badge.visible { opacity: 1; }

/* meta */
.mp__meta {
  padding: 36px 48px 0;
  position: relative; z-index: 1;
}
.mp__title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.8rem, 4.5vw, 4rem);
  letter-spacing: 0.5px;
  line-height: 1;
  margin-bottom: 8px;
}
.mp__mood {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
}
.mp__mood::before {
  content: '';
  display: block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

/* progress */
.mp__progress {
  padding: 28px 48px 0;
  position: relative; z-index: 1;
}
.mp__bar {
  width: 100%;
  height: var(--track-h);
  background: var(--lift);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin-bottom: 10px;
}
.mp__bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--grad);
  position: relative;
  transition: width 0.1s linear;
}
.mp__bar-fill::after {
  content: '';
  position: absolute;
  right: -6px; top: 50%;
  transform: translateY(-50%);
  width: 13px; height: 13px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px rgba(255,75,43,0.8);
  transition: transform 0.15s;
}
.mp__bar:hover .mp__bar-fill::after { transform: translateY(-50%) scale(1.3); }
.mp__times {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.5px;
  font-weight: 300;
}

/* controls */
.mp__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px 48px 20px;
  position: relative; z-index: 1;
}

/* volume */
.mp__volume {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 48px 32px;
  position: relative; z-index: 1;
}
.mp__vol-icon {
  width: 32px;
  background: none; border: none; color: var(--muted);
  display: flex; align-items: center; justify-content: center;
  transition: color 0.2s; flex-shrink: 0;
}
.mp__vol-icon:hover { color: var(--text); }
.mp__vol-slider { flex: 1; }

/* icon buttons */
.ic-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  width: 46px; height: 46px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, transform 0.15s, border-color 0.2s;
}
.ic-btn:hover { background: var(--lift); transform: scale(1.1); border-color: rgba(255,255,255,0.15); }
.ic-btn.ic-btn--main {
  width: 66px; height: 66px;
  background: #fff;
  color: #0c0c0f;
  border: none;
  box-shadow: 0 8px 32px rgba(255,75,43,0.35);
}
.ic-btn.ic-btn--main:hover { background: #f0ede8; transform: scale(1.08); }
.ic-btn.ic-btn--sm { width: 40px; height: 40px; }

/* ── RIGHT — PLAYLIST ── */
.pl {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pl__header {
  padding: 24px 24px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.pl__title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.pl__subtitle {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* list */
.pl__list {
  flex: 1;
  overflow-y: auto;
  padding: 10px 12px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,75,43,0.25) transparent;
}
.pl__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s;
  margin-bottom: 2px;
  position: relative;
  overflow: hidden;
}
.pl__item::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--grad);
  border-radius: 0 2px 2px 0;
  transform: scaleY(0);
  transition: transform 0.2s;
}
.pl__item:hover { background: rgba(255,255,255,0.04); }
.pl__item:hover::before { transform: scaleY(1); }
.pl__item.active { background: rgba(255,75,43,0.1); }
.pl__item.active::before { transform: scaleY(1); }

/* ── CIRCULAR thumbnail in playlist ── */
.pl__item-img {
  width: 48px; height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
  animation: spinCover 8s linear infinite;
  animation-play-state: paused;
  box-shadow: 0 0 0 2px rgba(255,75,43,0.12);
}
.pl__item-img.spinning {
  animation-play-state: running;
}
.pl__item-img-ph {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: var(--lift);
  display: grid; place-items: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.pl__item-info { flex: 1; min-width: 0; }
.pl__item-title {
  font-size: 13px; font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pl__item-mood { font-size: 11px; color: var(--muted); margin-top: 3px; }
.pl__item-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  color: var(--muted);
  flex-shrink: 0;
  transition: color 0.2s;
}
.pl__item.active .pl__item-num { color: var(--accent); }

/* wave bars when active */
.pl__wave {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 20px;
  flex-shrink: 0;
}
.pl__wave-bar {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: wave 0.8s ease-in-out infinite alternate;
}
.pl__wave-bar:nth-child(2) { animation-delay: 0.15s; }
.pl__wave-bar:nth-child(3) { animation-delay: 0.3s; }
.pl__wave-bar:nth-child(4) { animation-delay: 0.1s; }
.pl__wave-bar.paused { animation-play-state: paused; }
@keyframes wave {
  from { height: 4px; opacity: 0.5; }
  to   { height: 18px; opacity: 1; }
}

.pl__empty {
  padding: 48px 24px;
  text-align: center;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 1.8;
}

/* ── SHARED BUTTONS TWEAKS ── */
.ic-btn.active { color: var(--accent); border-color: rgba(255,75,43,0.3); }
`

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00"
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, "0")
  return `${m}:${sec}`
}

/* ─────────────────────────────────────────────────────────────────
   PLAYER COMPONENT
───────────────────────────────────────────────────────────────── */
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

  const mainAudio  = useRef(null)
  const mainBarRef = useRef(null)
  const [mainTime, setMainTime] = useState(0)
  const [mainDur,  setMainDur]  = useState(0)
  const [mainVol,  setMainVol]  = useState(1)
  const [mainMuted, setMainMuted] = useState(false)

  /* ── Load / reset on song change */
  useEffect(() => {
    if (!song?.url) return
    const a = mainAudio.current
    if (!a) return
    a.load()
    setMainTime(0)
    setIsPlaying(false)
    if (song?.mood) handleGetPlaylist(song.mood)
  }, [song])

  /* ── Playback controls */
  const mainToggle = async () => {
    const a = mainAudio.current
    if (!a) return
    if (isPlaying) { a.pause(); setIsPlaying(false) }
    else {
      await a.play(); setIsPlaying(true)
      if (song?._id) handleAddRecent(song._id)
    }
  }

  const mainSkip = (s) => {
    const a = mainAudio.current; if (!a) return
    a.currentTime = Math.min(Math.max(a.currentTime + s, 0), mainDur)
  }

  const mainProgressClick = (e) => {
    const a = mainAudio.current, bar = mainBarRef.current; if (!a || !bar) return
    const r = bar.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * mainDur
  }

  /* ── Click playlist item → load into main player */
  const selectPlaylistSong = (item) => {
    setSong(item)
  }

  const mainProg = mainDur ? (mainTime / mainDur) * 100 : 0

  if (!song) return null

  return (
    <>
      <style>{css}</style>

      <audio
        ref={mainAudio}
        src={song?.url}
        onTimeUpdate={() => setMainTime(mainAudio.current?.currentTime || 0)}
        onLoadedMetadata={() => setMainDur(mainAudio.current?.duration || 0)}
      />

      <div className="ma">

        {/* ══════════ LEFT — MAIN PLAYER ══════════ */}
        <div className="mp">

          <div className="mp__ambient" style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(255,75,43,0.12) 0%, transparent 65%)`
          }} />

          {/* Art — circular spinning cover */}
          <div className="mp__art-zone">
            <div className="mp__art-frame">
              <div className={`mp__ring${isPlaying ? "" : " paused"}`} />

              {song.posterUrl
                ? <img
                    src={song.posterUrl}
                    className={`mp__cover${isPlaying ? " spinning" : ""}`}
                    alt={song.title}
                  />
                : <div className="mp__cover-placeholder">🎵</div>
              }

              {/* vinyl centre hole */}
              <div className="mp__vinyl-hole" />

              <div className={`mp__playing-badge${isPlaying ? " visible" : ""}`}>
                Now Playing
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="mp__meta">
            <div className="mp__title">{song.title}</div>
            {song.mood && <div className="mp__mood">{song.mood}</div>}
          </div>

          {/* Progress */}
          <div className="mp__progress">
            <div className="mp__bar" ref={mainBarRef} onClick={mainProgressClick}>
              <div className="mp__bar-fill" style={{ width: `${mainProg}%` }} />
            </div>
            <div className="mp__times">
              <span>{fmt(mainTime)}</span>
              <span>{fmt(mainDur)}</span>
            </div>
          </div>

          {/* Controls — SVG icon buttons */}
          <div className="mp__controls">
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(-10)} title="Back 10s">
              <SkipBackLg />
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(-5)} title="Back 5s">
              <SkipBackSm />
            </button>
            <button className="ic-btn ic-btn--main" onClick={mainToggle}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(5)} title="Fwd 5s">
              <SkipFwdSm />
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(10)} title="Fwd 10s">
              <SkipFwdLg />
            </button>
          </div>

          {/* Volume */}
          <div className="mp__volume">
            <button className="mp__vol-icon" onClick={() => {
              const a = mainAudio.current; if (!a) return
              if (mainMuted) { a.volume = mainVol; setMainMuted(false) }
              else { a.volume = 0; setMainMuted(true) }
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

        {/* ══════════ RIGHT — PLAYLIST ══════════ */}
        <div className="pl">

          <div className="pl__header">
            <div className="pl__title">Playlist</div>
            <div className="pl__subtitle">
              {song.mood ? `Mood · ${song.mood}` : "Based on your track"} · {playlist?.length ?? 0} tracks
            </div>
          </div>

          <div className="pl__list">
            {!playlist?.length
              ? <div className="pl__empty">No tracks found<br />for this mood</div>
              : playlist.map((item, idx) => {
                  const isActive = song?._id === item._id
                  return (
                    <div
                      key={item._id}
                      className={`pl__item${isActive ? " active" : ""}`}
                      onClick={() => selectPlaylistSong(item)}
                    >
                      {item.posterUrl
                        ? <img
                            src={item.posterUrl}
                            className={`pl__item-img${isActive && isPlaying ? " spinning" : ""}`}
                            alt={item.title}
                          />
                        : <div className="pl__item-img-ph">🎵</div>
                      }
                      <div className="pl__item-info">
                        <div className="pl__item-title">{item.title}</div>
                        <div className="pl__item-mood">{item.mood}</div>
                      </div>

                      {isActive ? (
                        <div className="pl__wave">
                          {[0,1,2,3].map(i => (
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
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default Player