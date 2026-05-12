import React from 'react'
import FaceExpression from '../../expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../Hooks/useSong'
function Mood() {

const {handleGetSong} = useSong()


  return (
 <div>
<FaceExpression
onClick={(expression)=> {
  handleGetSong({mood: expression})
}}
/>
<Player/>
 </div>

  )
}

export default Mood