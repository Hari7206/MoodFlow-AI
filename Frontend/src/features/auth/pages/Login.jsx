import React, { useState } from 'react'
import '../style/login.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { handleLogin, loading } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword]     = useState('')

  const navigate = useNavigate()

  if (loading) {
    return (
      <main className="login-main">
        <div className="login-loading-screen">
          <span className="login-loading-dot" />
          <span className="login-loading-dot" />
          <span className="login-loading-dot" />
        </div>
      </main>
    )
  }

async function handleSubmit(e) {
  e.preventDefault()
  const success = await handleLogin(identifier, password)
  if (success) {
    navigate("/")
  }
}

  return (
    <main className="login-main">

      <div className="login-bg-grid"           aria-hidden="true" />
      <div className="login-spot login-spot--blue"   aria-hidden="true" />
      <div className="login-spot login-spot--indigo" aria-hidden="true" />
      <div className="login-spot login-spot--cyan"   aria-hidden="true" />
      <div className="login-spot login-spot--violet" aria-hidden="true" />

      <div className="login-card">

        <div className="login-gif-panel">
          <div className="login-gif-placeholder">
            
                <img src="https://i.pinimg.com/originals/6a/c7/80/6ac780f0649e8e2497148d50edf432c3.gif" alt="mooflow animation" /> 
          </div>
          <div className="login-gif-overlay">
            <span className="login-gif-brand">MooFlow AI</span>
            <p className="login-gif-tagline">
              HEAR YOUR<br />MOOD.
            </p>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-header">
            <h1>Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="login-identifier">Email or Username</label>
              <input
                id="login-identifier"
                type="text"
                name="username"
                placeholder="Enter email / username"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-form-meta">
              <label className="login-remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password" className="login-forgot">Forgot password?</a>
            </div>

            <button type="submit">Sign In</button>
          </form>

          <p className="login-register-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Login