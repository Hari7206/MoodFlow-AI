import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
})


export async function LoginUser(identifier, password) {

  try {
    const response = await api.post("/login", {
      identifier,
      password
    })
    return response.data
  }

  catch (err) {
    console.log(err);

  }
}

export async function RegisterUser(email, username, password) {

  try {

    const response = await api.post("/register", {
      email,
      username,
      password
    })

    return response.data

  } catch (err) {

    console.log(err)

  }
}

export async function getMe() {

  try {

    const response = await api.get("/get-me")
    return response.data

  } catch (err) {

    console.log(err)

    return null
  }
}


export async function LogoutUser() {

  try {

    const response = await api.get("/logout")

    return response.data

  } catch (err) {

    console.log(err)

  }
}


