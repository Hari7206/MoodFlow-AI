import React, { useEffect, useState } from "react"
import { useDashboard } from "../hook/usedashbaord"
import "./dashbaord.css"

const BARS = [14, 22, 10, 28, 18, 24, 12]

function Dashboard() {
  const { dashboard, loading, handleGetDashboard, handleUpdateUser } = useDashboard()

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [editing, setEditing] = useState(false)

  useEffect(() => { 
    handleGetDashboard() 
  }, [])

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
    <div className="db">
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

      <div className="db__body">
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

        <div className="db__grid">
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
  )
}

export default Dashboard