import React, { useEffect } from "react"
import { useAdmin } from "../hook/useAdmin"
import "./Admin.css"

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
        <div className="loader-ring" />
        <div className="loading-label">Loading Queue</div>
      </div>
    )
  }

  return (
    <div className="admin-root">
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