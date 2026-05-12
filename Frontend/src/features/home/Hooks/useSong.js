import { getSong } from "../service/song.api";
import {  useContext } from "react";
import { SongContext } from "../SongContext";


export const useSong = () => {
   
const context = useContext(SongContext)

const {song , setSong , loading , setLoading} = context

 async function handleGetSong({mood}) {
    setLoading(true)
    let data = await getSong({mood})
    setSong(data.song)
    setLoading(false)
}


return ({loading , song , handleGetSong})
}
