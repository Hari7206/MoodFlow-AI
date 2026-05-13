import React from "react"
import FaceExpression from "../../expression/components/FaceExpression"
import Player from "../components/Player"
import { useSong } from "../Hooks/useSong"

function Mood() {
  const { handleGetSong } = useSong()

  const handleExpression = async (expression) => {
    if (!expression) return
    await handleGetSong({ mood: expression })
  }

  return (
    <div>
      <FaceExpression onClick={handleExpression} />
      <Player />
    </div>
  )
}

export default Mood