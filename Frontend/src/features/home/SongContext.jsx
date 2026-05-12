import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
        url: "https://ik.imagekit.io/photosdata/modify/songs/MILLIONAIRE_SONG__Full_Video____YoYoHoneySingh____GLORY___BHUSHAN_KUMAR_zPC9Kho9j.mp3",
        posterUrl: "https://ik.imagekit.io/photosdata/modify/posters/MILLIONAIRE_SONG__Full_Video____YoYoHoneySingh____GLORY___BHUSHAN_KUMAR_8cDziQK31.jpeg",
        title: "MILLIONAIRE SONG (Full Video): @YoYoHoneySingh | GLORY | BHUSHAN KUMAR",
        mood: "happy"
    })

    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider
            value={{
                song,
                setSong,
                loading,
                setLoading
            }}
        >
            {children}
        </SongContext.Provider>
    )
}