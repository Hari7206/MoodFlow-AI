import React, { useEffect } from "react"
import { useAdmin } from "../hook/useAdmin"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .admin-root {
    min-height: 100vh;
    background: #0a0a0a;
    color: #f0ece4;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .admin-root::before {
    content: '';
    position: fixed;
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(220,50,20,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .admin-root::after {
    content: '';
    position: fixed;
    bottom: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,120,0,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* TOPBAR */
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(220,50,20,0.18);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 64px;
  }

  .topbar-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 26px;
    letter-spacing: 3px;
    color: #f0ece4;
  }

  .topbar-logo span {
    color: #e03214;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .topbar-badge {
    font-size: 12px;
    font-weight: 500;
    color: #888;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 4px 12px;
    border-radius: 20px;
  }

  .bell-btn {
    position: relative;
    background: rgba(220,50,20,0.1);
    border: 1px solid rgba(220,50,20,0.3);
    border-radius: 12px;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }

  .bell-btn:hover {
    background: rgba(220,50,20,0.2);
    border-color: rgba(220,50,20,0.5);
  }

  .bell-btn svg {
    width: 20px;
    height: 20px;
    color: #e03214;
    animation: bellShake 2.5s ease-in-out infinite;
  }

  @keyframes bellShake {
    0%,80%,100% { transform: rotate(0deg); }
    82% { transform: rotate(-12deg); }
    86% { transform: rotate(12deg); }
    90% { transform: rotate(-8deg); }
    94% { transform: rotate(8deg); }
    98% { transform: rotate(0deg); }
  }

  .bell-dot {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 9px;
    height: 9px;
    background: #e03214;
    border-radius: 50%;
    border: 2px solid #0a0a0a;
    animation: pulseDot 1.8s ease-in-out infinite;
  }

  .bell-dot.hidden { display: none; }

  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.8; }
  }

  /* HERO */
  .hero {
    position: relative;
    z-index: 1;
    padding: 3.5rem 2rem 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #e03214;
    margin-bottom: 1rem;
  }

  .hero-eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e03214;
    animation: pulseDot 1.8s ease-in-out infinite;
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 7vw, 82px);
    line-height: 0.92;
    letter-spacing: 2px;
    color: #f0ece4;
    margin-bottom: 1rem;
  }

  .hero-title .accent {
    color: #e03214;
    -webkit-text-stroke: 1px #e03214;
  }

  .hero-title .outline {
    -webkit-text-stroke: 1.5px rgba(240,236,228,0.3);
    color: transparent;
  }

  .hero-sub {
    font-size: 15px;
    color: #666;
    max-width: 480px;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .hero-stats {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .stat-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 1rem 1.5rem;
    min-width: 130px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #e03214, #ff7800);
    opacity: 0.6;
  }

  .stat-card.pending::before {
    opacity: 1;
    animation: statGlow 2s ease-in-out infinite;
  }

  @keyframes statGlow {
    0%,100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    color: #f0ece4;
    line-height: 1;
  }

  .stat-num.red { color: #e03214; }

  .stat-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #555;
    margin-top: 4px;
  }

  /* SECTION */
  .section {
    position: relative;
    z-index: 1;
    padding: 2.5rem 2rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: #f0ece4;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    background: #e03214;
    color: #fff;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .filter-tabs {
    display: flex;
    gap: 8px;
  }

  .filter-tab {
    background: none;
    border: 1px solid rgba(255,255,255,0.08);
    color: #555;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }

  .filter-tab.active, .filter-tab:hover {
    background: rgba(220,50,20,0.12);
    border-color: rgba(220,50,20,0.35);
    color: #e03214;
  }

  /* SONG GRID */
  .song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .song-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.25s, border-color 0.25s, background 0.25s;
    animation: cardIn 0.4s ease backwards;
  }

  .song-card:hover {
    transform: translateY(-3px);
    border-color: rgba(220,50,20,0.25);
    background: rgba(255,255,255,0.05);
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .song-card:nth-child(2) { animation-delay: 0.06s; }
  .song-card:nth-child(3) { animation-delay: 0.12s; }
  .song-card:nth-child(4) { animation-delay: 0.18s; }
  .song-card:nth-child(5) { animation-delay: 0.24s; }
  .song-card:nth-child(6) { animation-delay: 0.3s; }

  .song-poster-wrap {
    position: relative;
    width: 100%;
    padding-top: 52%;
    background: #111;
    overflow: hidden;
  }

  .song-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }

  .song-card:hover .song-poster {
    transform: scale(1.04);
  }

  .song-poster-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%);
  }

  .song-poster-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(10,10,10,0.75);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #ff7800;
    padding: 4px 10px;
    backdrop-filter: blur(8px);
  }

  .song-poster-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a0a05 0%, #0d0d0d 100%);
  }

  .song-poster-placeholder svg {
    width: 40px;
    height: 40px;
    color: #e03214;
    opacity: 0.4;
  }

  .song-info {
    padding: 1rem 1.25rem 1.25rem;
  }

  .song-meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .song-title {
    font-size: 15px;
    font-weight: 600;
    color: #f0ece4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .song-status-pill {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
  }

  .status-pending {
    background: rgba(255,120,0,0.15);
    color: #ff7800;
    border: 1px solid rgba(255,120,0,0.3);
  }

  .status-approved {
    background: rgba(40,190,80,0.12);
    color: #3ecf5e;
    border: 1px solid rgba(40,190,80,0.2);
  }

  .status-rejected {
    background: rgba(220,50,20,0.12);
    color: #e03214;
    border: 1px solid rgba(220,50,20,0.2);
  }

  .song-mood {
    font-size: 12px;
    color: #555;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .mood-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #e03214;
  }

  .song-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .btn-approve {
    background: rgba(40,190,80,0.1);
    border: 1px solid rgba(40,190,80,0.25);
    color: #3ecf5e;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .btn-approve:hover {
    background: rgba(40,190,80,0.2);
    border-color: rgba(40,190,80,0.5);
    transform: scale(1.02);
  }

  .btn-approve:active { transform: scale(0.97); }

  .btn-reject {
    background: rgba(220,50,20,0.08);
    border: 1px solid rgba(220,50,20,0.2);
    color: #e03214;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .btn-reject:hover {
    background: rgba(220,50,20,0.18);
    border-color: rgba(220,50,20,0.45);
    transform: scale(1.02);
  }

  .btn-reject:active { transform: scale(0.97); }

  /* EMPTY STATE */
  .empty-state {
    text-align: center;
    padding: 5rem 2rem;
    position: relative;
    z-index: 1;
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }

  .empty-icon svg {
    width: 36px;
    height: 36px;
    color: #333;
  }

  .empty-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
    color: #333;
    margin-bottom: 8px;
  }

  .empty-sub {
    font-size: 14px;
    color: #444;
  }

  /* LOADING */
  .loading-screen {
    min-height: 100vh;
    background: #0a0a0a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
  }

  .loader-ring {
    width: 52px;
    height: 52px;
    border: 2.5px solid rgba(220,50,20,0.15);
    border-top-color: #e03214;
    border-radius: 50%;
    animation: spin 0.85s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 3px;
    color: #333;
  }

  /* DIVIDER LINE */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(220,50,20,0.2), transparent);
    margin: 0 2rem;
  }
`

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function MusicIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SongCard({ song, onApprove, onReject }) {
  const statusClass =
    song.status === "approved" ? "status-approved" :
    song.status === "rejected" ? "status-rejected" : "status-pending"

  return (
    <div className="song-card">
      <div className="song-poster-wrap">
        {song.posterUrl ? (
          <img src={song.posterUrl} alt={song.title} className="song-poster" />
        ) : (
          <div className="song-poster-placeholder">
            <MusicIcon />
          </div>
        )}
        <div className="song-poster-overlay" />
        <div className="song-poster-badge">{song.mood || "Unknown"}</div>
      </div>

      <div className="song-info">
        <div className="song-meta-row">
          <span className="song-title">{song.title}</span>
          <span className={`song-status-pill ${statusClass}`}>{song.status}</span>
        </div>

        <div className="song-mood">
          <span className="mood-dot" />
          {song.artist || "Unknown Artist"}
          {song.duration ? ` · ${song.duration}` : ""}
        </div>

        {song.status === "pending" ? (
          <div className="song-actions">
            <button className="btn-approve" onClick={() => onApprove(song._id, "approved")}>
              <CheckIcon /> Approve
            </button>
            <button className="btn-reject" onClick={() => onReject(song._id, "rejected")}>
              <XIcon /> Reject
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", fontSize: "12px", color: "#444", paddingTop: "4px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
            {song.status === "approved" ? "✓ Approved" : "✕ Rejected"}
          </div>
        )}
      </div>
    </div>
  )
}

function Admin() {
  const {
    pendingSongs,
    loading,
    handleGetPendingSongs,
    handleUpdateSongStatus
  } = useAdmin()

  useEffect(() => {
    handleGetPendingSongs()
  }, [])

  const pendingCount = pendingSongs.filter(s => s.status === "pending").length
  const hasPending = pendingCount > 0

  if (loading) {
    return (
      <div className="loading-screen">
        <style>{styles}</style>
        <div className="loader-ring" />
        <div className="loading-label">Loading Queue</div>
      </div>
    )
  }

  return (
    <div className="admin-root">
      <style>{styles}</style>

      {/* TOPBAR */}
      <nav className="topbar">
        <div className="topbar-logo">Sound<span>Gate</span></div>
        <div className="topbar-right">
          <span className="topbar-badge">Admin Panel</span>
          <div className="bell-btn" title="Pending review requests">
            <BellIcon />
            <span className={`bell-dot ${hasPending ? "" : "hidden"}`} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Music Review Dashboard
        </div>
        <h1 className="hero-title">
          <span className="accent">REVIEW</span>{" "}
          <span className="outline">THE</span>
          <br />
          QUEUE
        </h1>
        <p className="hero-sub">
          Curate what gets heard. Approve tracks that meet the standard, reject what doesn't make the cut.
        </p>
        <div className="hero-stats">
          <div className="stat-card pending">
            <div className="stat-num red">{pendingCount}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{pendingSongs.filter(s => s.status === "approved").length}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{pendingSongs.filter(s => s.status === "rejected").length}</div>
            <div className="stat-label">Rejected</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{pendingSongs.length}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SONG LIST */}
      <section className="section">
        <div className="section-header">
          <div className="section-title">
            Submissions
            {pendingCount > 0 && <span className="section-count">{pendingCount}</span>}
          </div>
        </div>

        {pendingSongs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><MusicIcon size={36} /></div>
            <div className="empty-title">All Clear</div>
            <p className="empty-sub">No pending songs to review right now.</p>
          </div>
        ) : (
          <div className="song-grid">
            {pendingSongs.map(song => (
              <SongCard
                key={song._id}
                song={song}
                onApprove={handleUpdateSongStatus}
                onReject={handleUpdateSongStatus}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin