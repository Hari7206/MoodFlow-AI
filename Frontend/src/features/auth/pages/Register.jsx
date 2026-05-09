import React, { useState } from 'react'
import '../style/register.scss'
import { useAuth } from '../hooks/useAuth'

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")

  const { handleRegister, loading } = useAuth()

  if (loading) {
    return (
      <main>
        <div className="loading-screen">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </div>
      </main>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleRegister(email, username, password)
  }

  return (
    <main>
      <div className="bg-grid"            aria-hidden="true" />
      <div className="spot spot--green"   aria-hidden="true" />
      <div className="spot spot--teal"    aria-hidden="true" />
      <div className="spot spot--lime"    aria-hidden="true" />
      <div className="spot spot--amber"   aria-hidden="true" />


      <div className="maindiv">

       
        <div className="gif-panel">
          <div className="gif-placeholder" >
           <img src="https://i.pinimg.com/originals/a8/17/f2/a817f27f252c3e43c78181468b85b1e5.gif" alt="mood animation" />        
          </div>

          <div className="gif-overlay">
            <span className="gif-brand">MooFlow AI</span>
            <p className="gif-tagline">
              FEEL THE<br />MUSIC.
            </p>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-header">
            <h1>Create Account</h1>
            <p className="subtitle">Start your mood‑music journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Register