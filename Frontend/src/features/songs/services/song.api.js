import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true
})

export async function postSong(file, mood) {
  try {
    const formData = new FormData()
    formData.append("song", file)
    formData.append("mood", mood)
    const res = await api.post("songs", formData)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}