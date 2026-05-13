import React, { useEffect } from "react"
import "../style/admin.scss"
import { useAdmin } from "../hook/useAdmin"

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

  if (loading) {
    return <div className="admin__loading">Loading...</div>
  }

  return (
    <div className="admin">

      <h1 className="admin__title">Pending Songs</h1>

      {pendingSongs.length === 0 ? (
        <p className="admin__empty">No pending songs</p>
      ) : (
        <div className="admin__list">

          {pendingSongs.map((song) => (
            <div key={song._id} className="admin__card">

              <img
                src={song.posterUrl}
                className="admin__img"
                alt="poster"
              />

              <div className="admin__info">
                <h3 className="admin__songTitle">{song.title}</h3>
                <p className="admin__mood">{song.mood}</p>
                <p className="admin__status">{song.status}</p>

                <div className="admin__buttons">
                  <button
                    className="admin__approve"
                    onClick={() => handleUpdateSongStatus(song._id, "approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="admin__reject"
                    onClick={() => handleUpdateSongStatus(song._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default Admin