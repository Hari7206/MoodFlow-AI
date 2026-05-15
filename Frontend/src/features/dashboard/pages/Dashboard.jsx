import React, { useEffect, useState } from "react"
import { useDashboard } from "../hook/usedashbaord"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --surface2: #181818;
    --border: rgba(255,255,255,0.06);
    --accent: #e84118;
    --accent2: #ff6b35;
    --text: #f0ede8;
    --muted: #5a5652;
    --subtle: #2a2725;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .db {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    padding: 0 0 80px;
  }

  /* ── HERO BANNER ── */
  .db__hero {
    position: relative;
    height: 340px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a0a00 0%, #0a0a0a 60%);
  }
  .db__hero-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
    opacity: 0.6;
  }
  .db__hero-glow {
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(232,65,24,0.22) 0%, transparent 65%);
    top: -200px; right: -100px;
    pointer-events: none;
  }
  .db__hero-glow2 {
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 65%);
    bottom: -60px; left: 80px;
    pointer-events: none;
  }

  /* pill label */
  .db__label {
    position: absolute;
    top: 28px; left: 36px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--accent);
    background: rgba(232,65,24,0.12);
    border: 1px solid rgba(232,65,24,0.25);
    padding: 4px 12px;
    border-radius: 100px;
  }

  /* tagline */
  .db__hero-copy {
    position: absolute;
    bottom: 40px; left: 36px;
    right: 36px;
  }
  .db__hero-copy h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 7vw, 88px);
    line-height: 0.92;
    letter-spacing: -1px;
    color: var(--text);
  }
  .db__hero-copy h1 span {
    color: var(--accent);
    -webkit-text-stroke: 1px var(--accent);
  }
  .db__hero-copy p {
    margin-top: 10px;
    font-size: 13px;
    font-weight: 300;
    color: var(--muted);
    letter-spacing: 0.3px;
    max-width: 340px;
  }

  /* stats row in hero */
  .db__stats {
    position: absolute;
    top: 28px; right: 36px;
    display: flex; gap: 24px;
  }
  .db__stat {
    text-align: right;
  }
  .db__stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    color: var(--text);
    line-height: 1;
  }
  .db__stat-lbl {
    font-size: 10px;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
  }

  /* ── AVATAR ROW ── */
  .db__profile-row {
    display: flex;
    align-items: flex-end;
    gap: 20px;
    padding: 0 36px;
    margin-top: -52px;
    position: relative;
    z-index: 10;
  }
  .db__avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .db__avatar {
    width: 100px; height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent);
    display: block;
  }
  .db__avatar-ring {
    position: absolute; inset: -6px;
    border-radius: 50%;
    border: 1px solid rgba(232,65,24,0.3);
  }
  .db__avatar-badge {
    position: absolute;
    bottom: 4px; right: 4px;
    width: 16px; height: 16px;
    background: var(--accent);
    border-radius: 50%;
    border: 2px solid var(--bg);
  }

  .db__profile-info {
    flex: 1;
    padding-bottom: 6px;
  }
  .db__profile-info h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    letter-spacing: 0.5px;
    line-height: 1;
    color: var(--text);
  }
  .db__profile-info p {
    font-size: 13px;
    color: var(--muted);
    font-weight: 300;
    margin-top: 3px;
  }
  .db__profile-info small {
    font-size: 11px;
    color: var(--accent);
    letter-spacing: 1px;
  }

  .db__edit-btn {
    margin-bottom: 6px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 8px 20px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .db__edit-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* ── DIVIDER ── */
  .db__divider {
    height: 1px;
    background: var(--border);
    margin: 28px 36px 0;
  }

  /* ── MAIN CONTENT ── */
  .db__body {
    padding: 28px 36px 0;
  }

  /* section label */
  .db__section-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
  }

  /* ── EDIT DRAWER ── */
  .db__edit-drawer {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 28px;
    animation: slideDown 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .db__edit-drawer h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 1px;
    color: var(--text);
    margin-bottom: 20px;
  }
  .db__edit-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .db__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .db__field label {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .db__input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .db__input:focus { border-color: var(--accent); }

  .db__file-label {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface2);
    border: 1px dashed var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    cursor: pointer;
    font-size: 13px;
    color: var(--muted);
    transition: border-color 0.2s;
    grid-column: 1 / -1;
  }
  .db__file-label:hover { border-color: var(--accent); color: var(--text); }
  .db__file-label input { display: none; }

  .db__edit-actions {
    display: flex;
    gap: 10px;
    margin-top: 6px;
  }
  .db__save-btn {
    background: var(--accent);
    border: none;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px 28px;
    border-radius: 100px;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .db__save-btn:hover { opacity: 0.85; }
  .db__cancel-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .db__cancel-btn:hover { border-color: var(--muted); color: var(--text); }

  /* ── GRID ── */
  .db__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .db__card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
  }
  .db__card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .db__card-icon {
    width: 32px; height: 32px;
    background: rgba(232,65,24,0.12);
    border: 1px solid rgba(232,65,24,0.2);
    border-radius: 8px;
    display: grid; place-items: center;
    font-size: 14px;
  }
  .db__card h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 1.5px;
    color: var(--text);
  }

  .db__song-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    transition: opacity 0.15s;
  }
  .db__song-item:last-child { border-bottom: none; }
  .db__song-item:hover { opacity: 0.75; }

  .db__song-img-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .db__song-img {
    width: 44px; height: 44px;
    border-radius: 8px;
    object-fit: cover;
    display: block;
  }
  .db__song-num {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.55);
    border-radius: 8px;
    display: grid; place-items: center;
    font-size: 10px;
    color: var(--muted);
    opacity: 0;
    transition: opacity 0.15s;
  }
  .db__song-item:hover .db__song-num { opacity: 1; }

  .db__song-info { flex: 1; min-width: 0; }
  .db__song-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .db__song-mood {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
  }

  .db__song-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--subtle);
    flex-shrink: 0;
  }
  .db__song-item:hover .db__song-dot {
    background: var(--accent);
    box-shadow: 0 0 8px rgba(232,65,24,0.5);
  }

  /* brand strip */
  .db__brand-strip {
    margin: 28px 36px 0;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    overflow: hidden;
    position: relative;
  }
  .db__brand-strip::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--accent), var(--accent2));
  }
  .db__brand-text {
    flex: 1;
  }
  .db__brand-text h4 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--text);
    line-height: 1;
  }
  .db__brand-text p {
    font-size: 12px;
    color: var(--muted);
    font-weight: 300;
    margin-top: 4px;
  }
  .db__brand-waveform {
    display: flex;
    align-items: center;
    gap: 3px;
    height: 32px;
  }
  .db__bar {
    width: 3px;
    background: var(--accent);
    border-radius: 2px;
    opacity: 0.6;
    animation: pulse 1.4s ease-in-out infinite;
  }
  .db__bar:nth-child(2) { animation-delay: 0.1s; }
  .db__bar:nth-child(3) { animation-delay: 0.2s; }
  .db__bar:nth-child(4) { animation-delay: 0.3s; }
  .db__bar:nth-child(5) { animation-delay: 0.15s; }
  .db__bar:nth-child(6) { animation-delay: 0.05s; }
  .db__bar:nth-child(7) { animation-delay: 0.25s; }
  @keyframes pulse {
    0%, 100% { height: 8px; opacity: 0.4; }
    50% { height: 28px; opacity: 1; }
  }

  /* loading */
  .db__loading {
    min-height: 100vh;
    display: grid; place-items: center;
    background: var(--bg);
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .db__hero { height: 260px; }
    .db__hero-copy h1 { font-size: 48px; }
    .db__stats { display: none; }
    .db__profile-row { padding: 0 20px; }
    .db__body { padding: 20px 20px 0; }
    .db__brand-strip { margin: 20px 20px 0; }
    .db__grid { grid-template-columns: 1fr; }
    .db__edit-grid { grid-template-columns: 1fr; }
    .db__divider { margin: 20px 20px 0; }
  }
`

const BARS = [14, 22, 10, 28, 18, 24, 12]

function Dashboard() {
  const { dashboard, loading, handleGetDashboard, handleUpdateUser } = useDashboard()

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => { handleGetDashboard() }, [])

  useEffect(() => {
    if (dashboard?.user) {
      setName(dashboard.user.name || "")
      setBio(dashboard.user.bio || "")
    }
  }, [dashboard])

  if (loading) return <div className="db__loading">Loading…</div>
  if (!dashboard) return <div className="db__loading">No data found</div>

  const { user, uploads, recent } = dashboard

  async function handleUpdate() {
    await handleUpdateUser(file, { name, bio })
    setEditing(false)
  }

  function handleCancel() {
    setName(user?.name || "")
    setBio(user?.bio || "")
    setFile(null)
    setFileName("")
    setEditing(false)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="db">

        {/* ── HERO ── */}
        <div className="db__hero">
          <div className="db__hero-noise" />
          <div className="db__hero-glow" />
          <div className="db__hero-glow2" />

          <div className="db__label">ARTIST DASHBOARD</div>

          <div className="db__stats">
            <div className="db__stat">
              <div className="db__stat-num">{uploads?.length ?? 0}</div>
              <div className="db__stat-lbl">Tracks</div>
            </div>
            <div className="db__stat">
              <div className="db__stat-num">{recent?.length ?? 0}</div>
              <div className="db__stat-lbl">Played</div>
            </div>
          </div>

          <div className="db__hero-copy">
            <h1>YOUR <span>SOUND</span><br />YOUR STAGE</h1>
            <p>Manage your music, shape your identity, and connect with listeners worldwide.</p>
          </div>
        </div>

        {/* ── PROFILE ROW ── */}
        <div className="db__profile-row">
          <div className="db__avatar-wrap">
            <img src={user?.profilePic} className="db__avatar" alt={user?.name} />
            <div className="db__avatar-ring" />
            <div className="db__avatar-badge" />
          </div>

          <div className="db__profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.bio}</p>
            <small>@{user?.username}</small>
          </div>

          <button className="db__edit-btn" onClick={() => setEditing(e => !e)}>
            {editing ? "CLOSE" : "EDIT PROFILE"}
          </button>
        </div>

        <div className="db__divider" />

        {/* ── BRAND STRIP ── */}
        <div className="db__brand-strip">
          <div className="db__brand-text">
            <h4>NOW STREAMING YOUR WORLD</h4>
            <p>Your profile is live · Share it, play it, own it.</p>
          </div>
          <div className="db__brand-waveform">
            {BARS.map((h, i) => (
              <div key={i} className="db__bar" style={{ height: h + "px" }} />
            ))}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="db__body">

          {/* EDIT DRAWER */}
          {editing && (
            <div className="db__edit-drawer">
              <h3>EDIT PROFILE</h3>
              <div className="db__edit-grid">
                <div className="db__field">
                  <label>Display Name</label>
                  <input
                    className="db__input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="db__field">
                  <label>Bio</label>
                  <input
                    className="db__input"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Short bio"
                  />
                </div>
                <label className="db__file-label">
                  <span>📎</span>
                  <span>{fileName || "Upload new avatar…"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      setFile(e.target.files[0])
                      setFileName(e.target.files[0]?.name || "")
                    }}
                  />
                </label>
              </div>
              <div className="db__edit-actions">
                <button className="db__save-btn" onClick={handleUpdate}>Save Changes</button>
                <button className="db__cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}

          {/* CARDS */}
          <div className="db__grid">

            {/* UPLOADS */}
            <div className="db__card">
              <div className="db__card-header">
                <div className="db__card-icon">🎵</div>
                <h3>YOUR UPLOADS</h3>
              </div>
              {uploads?.map((song, idx) => (
                <div key={song._id} className="db__song-item">
                  <div className="db__song-img-wrap">
                    <img src={song.posterUrl} className="db__song-img" alt={song.title} />
                    <div className="db__song-num">{String(idx + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="db__song-info">
                    <div className="db__song-title">{song.title}</div>
                    <div className="db__song-mood">{song.mood}</div>
                  </div>
                  <div className="db__song-dot" />
                </div>
              ))}
            </div>

            {/* RECENT */}
            <div className="db__card">
              <div className="db__card-header">
                <div className="db__card-icon">⏱</div>
                <h3>RECENTLY PLAYED</h3>
              </div>
              {recent?.map((item, idx) => (
                <div key={item._id} className="db__song-item">
                  <div className="db__song-img-wrap">
                    <img src={item.song?.posterUrl} className="db__song-img" alt={item.song?.title} />
                    <div className="db__song-num">{String(idx + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="db__song-info">
                    <div className="db__song-title">{item.song?.title}</div>
                    <div className="db__song-mood">{item.song?.mood}</div>
                  </div>
                  <div className="db__song-dot" />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard