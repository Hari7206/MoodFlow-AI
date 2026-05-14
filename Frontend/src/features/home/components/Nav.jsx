import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "../components/nav.css"

const LINKS = [
  { label: 'Home',      path: '/'              },
  { label: 'Listen',    path: '/face'          },
  { label: 'Upload',    path: '/uploadSong'    },
  { label: 'Dashboard', path: '/userDashboard' },
]

export default function Navbar({ user }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [dropOpen,    setDropOpen]    = useState(false)
  const location  = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropOpen(false) }, [location.pathname])

  const logout = () => navigate('/login')
  const init   = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <header className="nb">
      <div className={`nb__bar${scrolled ? ' nb__bar--glow' : ''}`}>

        <Link to="/" className="nb__logo">
          <div className="nb__logo-pulse">
            <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zm12-2a3 3 0 100-6 3 3 0 000 6z"/></svg>
          </div>
          <span className="nb__logo-text">Mood<em>Sync</em></span>
        </Link>

        <ul className="nb__links">
          {LINKS.map(l => (
            <li key={l.path}>
              <Link
                to={l.path}
                className={`nb__link${location.pathname === l.path ? ' nb__link--on' : ''}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nb__right">
          {user ? (
            <>
              <Link to="/uploadSong" className="nb__upload">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                Upload
              </Link>
              <div className="nb__avatar-wrap">
                <button className="nb__avatar" onClick={() => setDropOpen(p => !p)}>
                  {user.avatar ? <img src={user.avatar} alt="" /> : init}
                </button>
                <div className={`nb__drop${dropOpen ? ' nb__drop--open' : ''}`}>
                  <div className="nb__drop-head">
                    <span className="nb__drop-name">{user.name || 'User'}</span>
                    <span className="nb__drop-email">{user.email || ''}</span>
                  </div>
                  <Link to="/userDashboard" className="nb__drop-item">Dashboard</Link>
                  <Link to="/face"          className="nb__drop-item">Start Listening</Link>
                  <div className="nb__drop-sep" />
                  <button onClick={logout} className="nb__drop-item nb__drop-item--red">Log Out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login"    className="nb__ghost-link">Sign In</Link>
              <Link to="/register" className="nb__cta">Get Started</Link>
            </>
          )}

          <button
            className={`nb__burger${menuOpen ? ' nb__burger--open' : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nb__mobile${menuOpen ? ' nb__mobile--open' : ''}`}>
        <div className="nb__mob-links">
          {LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`nb__mob-link${location.pathname === l.path ? ' nb__mob-link--on' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nb__mob-foot">
          {user ? (
            <>
              <div className="nb__mob-user">
                <button className="nb__avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
                  {user.avatar ? <img src={user.avatar} alt="" /> : init}
                </button>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>
              <button onClick={logout} className="nb__mob-logout">Log Out</button>
            </>
          ) : (
            <Link to="/register" className="nb__cta" style={{ justifyContent: 'center' }}>
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}