import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true
})

export async function postSong(file, mood) {

    try {

        const formData = new FormData()

        formData.append("song", file)
        formData.append("mood", mood)

        const response = await api.post("/songs", formData)

        return response.data

    } catch (err) {

        console.log(err)

        throw err
    }
}

export async function getSong({ mood }) {
  const res = await api.get(`/songs?mood=${mood}`)
  return res.data
}

export const getPlaylist = async (mood) => {
  const res = await api.get(`/songs/playlist?mood=${mood}`)
  return res.data
}

export async function addRecent(songId) {
  const res = await api.post(`/recent/${songId}`)
  return res.data
}

