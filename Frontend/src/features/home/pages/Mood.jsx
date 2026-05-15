import React from "react"
import FaceExpression from "../../expression/components/FaceExpression"
import Player from "../components/Player"
import Nav from "../../home/components/Nav"
import { useSong } from "../Hooks/useSong"
import "./Mood.scss"

function Mood() {
  const { handleGetSong, song } = useSong()

  const handleExpression = async (expression) => {
    if (!expression) return
    await handleGetSong({ mood: expression })
  }

  return (
    <div className="mood-page">
    <Nav/>
      <div className="blob blob--a" />
      <div className="blob blob--b" />
      <div className="scanlines" />

  
      <header className="mp-header">
        <div className="mp-header__brand">
          <span className="mp-header__icon">◈</span>
          <span className="mp-header__logo">MOODIFY</span>
        </div>
        <span className="mp-header__sub">AI mood-based player</span>
      </header>

      {/* ══ TOP STRIP — expression scanner ══ */}
      <section className="mp-scanner">
        <div className="mp-scanner__label">
          <span className="live-dot" />
          EXPRESSION SCANNER
        </div>
        <div className="mp-scanner__body">
          <FaceExpression onClick={handleExpression} />
        </div>
      </section>

      {/* ══ BOTTOM — player + playlist ══ */}
      <section className="mp-stage">
        {song ? (
          <Player />
        ) : (
          <div className="mp-idle">
            <div className="mp-idle__ring" />
            <span className="mp-idle__icon">♬</span>
            <p className="mp-idle__text">
              Detect your expression above<br />to load a track
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Mood