import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true
})

export async function postSong(file, mood) {
  try {
    const formData = new FormData()

    formData.append("song", file)
    formData.append("mood", mood)

    const res = await api.post("/songs", formData)

    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}