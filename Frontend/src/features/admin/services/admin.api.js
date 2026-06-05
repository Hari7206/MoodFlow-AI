import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true
})


export async function getPendingSongs() {
  try {
    const res = await api.get("admin/songs/pending")
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}


export async function updateSongStatus(songId, status) {
  try {
    const res = await api.patch(`admin/songs/${songId}/status`, {
      status
    })

    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}