import axios from "axios"



const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true
})


export async function getDashboard() {
  const res = await api.get("/dashboard")
  return res.data
}


export async function updateUser(file, data = {}) {
  try {
    let response

    if (file) {
      const formData = new FormData()

      formData.append("profilePic", file)

      if (data.name) formData.append("name", data.name)
      if (data.bio) formData.append("bio", data.bio)

      response = await api.patch("/users/update", formData)
    } else {
      response = await api.patch("/users/update", data)
    }

    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
}