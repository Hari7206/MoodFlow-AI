import React, { useRef, useState, useEffect } from "react"
import { useSong } from "../Hooks/useSong"

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

.mp__cover {
  width: 280px; height: 280px;
  border-radius: 20px;
  object-fit: cover;
  display: block;
  box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
  transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
}
.mp__cover:hover { transform: scale(1.025) rotate(-1deg); }

.mp__cover-placeholder {
  width: 280px; height: 280px;
  border-radius: 20px;
  background: var(--surface);
  display: grid; place-items: center;
  font-size: 4rem;
  box-shadow: 0 32px 80px rgba(0,0,0,0.5);
}

/* playing badge */
.mp__playing-badge {
  position: absolute;
  bottom: -14px; left: 50%;
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
  font-size: 16px; transition: color 0.2s; flex-shrink: 0;
  text-align: center;
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
  font-size: 16px;
  transition: background 0.2s, transform 0.15s, border-color 0.2s;
}
.ic-btn:hover { background: var(--lift); transform: scale(1.1); border-color: rgba(255,255,255,0.15); }
.ic-btn.ic-btn--main {
  width: 66px; height: 66px;
  background: #fff;
  color: #0c0c0f;
  border: none;
  font-size: 22px;
  box-shadow: 0 8px 32px rgba(255,75,43,0.35);
}
.ic-btn.ic-btn--main:hover { background: #f0ede8; transform: scale(1.08); }
.ic-btn.ic-btn--sm { width: 38px; height: 38px; font-size: 14px; }

/* ── RIGHT — PLAYLIST ── */
.pl {
  background: var(--panel);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pl__header {
  padding: 28px 24px 16px;
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

/* playlist mini player */
.pl__mini {
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  flex-shrink: 0;
  position: relative;
}
.pl__mini-prog {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  background: var(--grad);
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}
.pl__mini-bar {
  width: 100%;
  height: 3px;
  background: var(--lift);
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 12px;
}
.pl__mini-bar-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--grad);
  transition: width 0.1s linear;
}
.pl__mini-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.pl__mini-img {
  width: 44px; height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.pl__mini-img-ph {
  width: 44px; height: 44px;
  border-radius: 8px;
  background: var(--lift);
  display: grid; place-items: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.pl__mini-info { flex: 1; min-width: 0; }
.pl__mini-song {
  font-size: 13px; font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pl__mini-mood { font-size: 11px; color: var(--muted); margin-top: 2px; }
.pl__mini-ctrls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.pl__mini-times {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--muted);
  margin-top: 4px;
  letter-spacing: 0.3px;
}

/* list */
.pl__list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
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

.pl__item-img {
  width: 48px; height: 48px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
}
.pl__item-img-ph {
  width: 48px; height: 48px;
  border-radius: 10px;
  background: var(--lift);
  display: grid; place-items: center;
  font-size: 1.4rem;
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

  // ── MAIN PLAYER refs/state
  const mainAudio = useRef(null)
  const mainBarRef = useRef(null)
  const [mainTime, setMainTime] = useState(0)
  const [mainDur, setMainDur]   = useState(0)
  const [mainVol, setMainVol]   = useState(1)
  const [mainMuted, setMainMuted] = useState(false)

  // ── PLAYLIST PLAYER refs/state
  const plAudio    = useRef(null)
  const plBarRef   = useRef(null)
  const [plSong, setPlSong]       = useState(null)
  const [plPlaying, setPlPlaying] = useState(false)
  const [plTime, setPlTime]       = useState(0)
  const [plDur, setPlDur]         = useState(0)
  const [plVol, setPlVol]         = useState(1)

  // ── Load main song
  useEffect(() => {
    if (!song?.url) return
    const a = mainAudio.current
    if (!a) return
    a.load()
    setMainTime(0)
    setIsPlaying(false)
    if (song?.mood) handleGetPlaylist(song.mood)
  }, [song])

  // ── Load playlist song
  useEffect(() => {
    if (!plSong?.url) return
    const a = plAudio.current
    if (!a) return
    a.load()
    setPlTime(0)
    setPlPlaying(false)
  }, [plSong])

  // ── Main controls
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

  // ── Playlist controls
  const plToggle = async () => {
    const a = plAudio.current; if (!a || !plSong) return
    if (plPlaying) { a.pause(); setPlPlaying(false) }
    else { await a.play(); setPlPlaying(true) }
  }
  const plSkip = (s) => {
    const a = plAudio.current; if (!a) return
    a.currentTime = Math.min(Math.max(a.currentTime + s, 0), plDur)
  }
  const plProgressClick = (e) => {
    const a = plAudio.current, bar = plBarRef.current; if (!a || !bar) return
    const r = bar.getBoundingClientRect()
    a.currentTime = ((e.clientX - r.left) / r.width) * plDur
  }
  const selectPlaylistSong = (item) => {
    setPlSong(item)
    setPlTime(0); setPlPlaying(false)
  }

  const mainProg = mainDur ? (mainTime / mainDur) * 100 : 0
  const plProg   = plDur   ? (plTime  / plDur)   * 100 : 0

  if (!song) return null

  return (
    <>
      <style>{css}</style>

      {/* Hidden audio elements */}
      <audio
        ref={mainAudio}
        src={song?.url}
        onTimeUpdate={() => setMainTime(mainAudio.current?.currentTime || 0)}
        onLoadedMetadata={() => setMainDur(mainAudio.current?.duration || 0)}
      />
      {plSong?.url && (
        <audio
          ref={plAudio}
          src={plSong.url}
          onTimeUpdate={() => setPlTime(plAudio.current?.currentTime || 0)}
          onLoadedMetadata={() => setPlDur(plAudio.current?.duration || 0)}
        />
      )}

      <div className="ma">

        {/* ══════════════════ LEFT — MAIN PLAYER ══════════════════ */}
        <div className="mp">

          {/* ambient glow */}
          <div className="mp__ambient" style={{
            background: `radial-gradient(ellipse at 50% 30%, rgba(255,75,43,0.12) 0%, transparent 65%)`
          }} />

          {/* Art */}
          <div className="mp__art-zone">
            <div className="mp__art-frame">
              <div className={`mp__ring${isPlaying ? "" : " paused"}`} />
              {song.posterUrl
                ? <img src={song.posterUrl} className="mp__cover" alt={song.title} />
                : <div className="mp__cover-placeholder">🎵</div>
              }
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

          {/* Controls */}
          <div className="mp__controls">
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(-10)} title="Back 10s">
              ⏪
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(-5)} title="Back 5s">
              ↩
            </button>
            <button className="ic-btn ic-btn--main" onClick={mainToggle}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(5)} title="Fwd 5s">
              ↪
            </button>
            <button className="ic-btn ic-btn--sm" onClick={() => mainSkip(10)} title="Fwd 10s">
              ⏩
            </button>
          </div>

          {/* Volume */}
          <div className="mp__volume">
            <button className="mp__vol-icon" onClick={() => {
              const a = mainAudio.current; if (!a) return
              if (mainMuted) { a.volume = mainVol; setMainMuted(false) }
              else { a.volume = 0; setMainMuted(true) }
            }}>
              {mainMuted ? "🔇" : mainVol > 0.5 ? "🔊" : "🔉"}
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

        {/* ══════════════════ RIGHT — PLAYLIST ══════════════════ */}
        <div className="pl">

          <div className="pl__header">
            <div className="pl__title">Playlist</div>
            <div className="pl__subtitle">
              {song.mood ? `Mood · ${song.mood}` : "Based on your track"} · {playlist?.length ?? 0} tracks
            </div>
          </div>

          {/* Playlist mini-player */}
          {plSong && (
            <div className="pl__mini">
              {/* progress top bar */}
              <div
                className="pl__mini-bar"
                ref={plBarRef}
                onClick={plProgressClick}
              >
                <div className="pl__mini-bar-fill" style={{ width: `${plProg}%` }} />
              </div>
              <div className="pl__mini-row">
                {plSong.posterUrl
                  ? <img src={plSong.posterUrl} className="pl__mini-img" alt={plSong.title} />
                  : <div className="pl__mini-img-ph">🎵</div>
                }
                <div className="pl__mini-info">
                  <div className="pl__mini-song">{plSong.title}</div>
                  <div className="pl__mini-mood">{plSong.mood}</div>
                </div>
                <div className="pl__mini-ctrls">
                  <button className="ic-btn ic-btn--sm" onClick={() => plSkip(-5)}>⏪</button>
                  <button className="ic-btn" onClick={plToggle} style={{ width: 46, height: 46 }}>
                    {plPlaying ? "⏸" : "▶"}
                  </button>
                  <button className="ic-btn ic-btn--sm" onClick={() => plSkip(5)}>⏩</button>
                </div>
              </div>
              <div className="pl__mini-times">
                <span>{fmt(plTime)}</span>
                <span>{fmt(plDur)}</span>
              </div>
            </div>
          )}

          {/* Track list */}
          <div className="pl__list">
            {!playlist?.length
              ? <div className="pl__empty">No tracks found<br />for this mood</div>
              : playlist.map((item, idx) => {
                  const isActive = plSong?._id === item._id
                  return (
                    <div
                      key={item._id}
                      className={`pl__item${isActive ? " active" : ""}`}
                      onClick={() => selectPlaylistSong(item)}
                    >
                      {item.posterUrl
                        ? <img src={item.posterUrl} className="pl__item-img" alt={item.title} />
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
                              className={`pl__wave-bar${plPlaying ? "" : " paused"}`}
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