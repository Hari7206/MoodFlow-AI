import React, { useEffect, useState } from "react"
import { useDashboard } from "../hook/usedashbaord"
import "../style/dashbaord.scss"

function Dashboard() {

  const {
    dashboard,
    loading,
    handleGetDashboard,
    handleUpdateUser
  } = useDashboard()

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [file, setFile] = useState(null)

  useEffect(() => {
    handleGetDashboard()
  }, [])

  useEffect(() => {
    if (dashboard?.user) {
      setName(dashboard.user.name || "")
      setBio(dashboard.user.bio || "")
    }
  }, [dashboard])

  if (loading) {
    return <div className="dashboard__loading">Loading dashboard...</div>
  }

  if (!dashboard) {
    return <div className="dashboard__loading">No data found</div>
  }

  const { user, uploads, recent } = dashboard

  async function handleUpdate() {
    await handleUpdateUser(file, { name, bio })
  }

  return (
    <div className="dashboard">

      {/* USER + EDIT */}
      <div className="dashboard__user">

        <img src={user?.profilePic} className="dashboard__avatar" />

        <div className="dashboard__userInfo">

          <h2>{user?.name}</h2>
          <p>{user?.bio}</p>
          <small>@{user?.username}</small>

        </div>
      </div>

      {/* UPDATE FORM */}
      <div className="dashboard__card">
        <h3>✏️ Update Profile</h3>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="dashboard__input"
        />

        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="dashboard__input"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpdate}
          className="dashboard__button"
        >
          Update Profile
        </button>
      </div>

      {/* GRID */}
      <div className="dashboard__grid">

        {/* UPLOADS */}
        <div className="dashboard__card">
          <h3>🎵 Your Uploads</h3>

          {uploads?.map((song) => (
            <div key={song._id} className="dashboard__item">
              <img src={song.posterUrl} className="dashboard__songImg" />
              <div>
                <p className="dashboard__title">{song.title}</p>
                <small>{song.mood}</small>
              </div>
            </div>
          ))}
        </div>

        {/* RECENT */}
        <div className="dashboard__card">
          <h3>⏱ Recently Played</h3>

          {recent?.map((item) => (
            <div key={item._id} className="dashboard__item">
              <img src={item.song?.posterUrl} className="dashboard__songImg" />
              <div>
                <p className="dashboard__title">{item.song?.title}</p>
                <small>{item.song?.mood}</small>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Dashboard